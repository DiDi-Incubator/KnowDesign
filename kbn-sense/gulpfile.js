const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const rimraf = require('rimraf');
const through2 = require('through2');
const ts = require('gulp-typescript');
const merge2 = require('merge2');
const stripCode = require('gulp-strip-code');
const babel = require('gulp-babel');
const argv = require('minimist')(process.argv.slice(2));

const cwd = process.cwd();
const libDir = path.join(cwd, 'lib');
const esDir = path.join(cwd, 'es');
const tsDefaultReporter = ts.reporter.defaultReporter();

const tsConfig = require('./scripts/build/getTSCommonConfig')();
const transformLess = require('./scripts/build/transformLess');
const getBabelCommonConfig = require('./scripts/build/getBabelCommonConfig');
const replaceLib = require('./scripts/build/replaceLib');

function compile(modules) {
  rimraf.sync(modules !== false ? libDir : esDir);
  // =============================== LESS ===============================
  const less = gulp
    .src(['src/**/*.less'])
    .pipe(
      through2.obj(function (file, encoding, next) {
        // Replace content
        const cloneFile = file.clone();
        const content = file.contents.toString().replace(/^\uFEFF/, '');

        cloneFile.contents = Buffer.from(content);

        // Clone for css here since `this.push` will modify file.path
        const cloneCssFile = cloneFile.clone();

        this.push(cloneFile);

        // Transform less file
        if (
          file.path.match(/(\/|\\)styles(\/|\\)index\.less$/) ||
          file.path.match(/(\/|\\)\.less$/)
        ) {
          transformLess(cloneCssFile.contents.toString(), cloneCssFile.path)
            .then((css) => {
              cloneCssFile.contents = Buffer.from(css);
              cloneCssFile.path = cloneCssFile.path.replace(/\.less$/, '.css');
              this.push(cloneCssFile);
              next();
            })
            .catch((e) => {
              console.error(e);
            });
        } else {
          next();
        }
      }),
    )
    .pipe(gulp.dest(modules === false ? esDir : libDir));

  // =============================== JSON FILE ===============================
  const json = gulp
    .src(['src/**/*.json'])
    .pipe(
      through2.obj(function (file, encoding, next) {
        // Replace content
        const cloneFile = file.clone();
        const content = file.contents.toString().replace(/^\uFEFF/, '');

        cloneFile.contents = Buffer.from(content);

        this.push(cloneFile);
        next();
      }),
    )
    .pipe(gulp.dest(modules === false ? esDir : libDir));

  let error = 0;

  // =============================== FILE ===============================
  let transformFileStream;
  const transformTSFile = (file) => {};

  transformFileStream = gulp
    .src(['src/**/*.tsx'])
    .pipe(
      through2.obj(function (file, encoding, next) {
        let nextFile = transformFile(file) || file;
        nextFile = Array.isArray(nextFile) ? nextFile : [nextFile];
        nextFile.forEach((f) => this.push(f));
        next();
      }),
    )
    .pipe(gulp.dest(modules === false ? esDir : libDir));

  // ================================ TS ================================
  const source = [
    'src/**/*.tsx',
    'src/**/*.ts',
    'src/**/*.js',
    'src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/*.test.ts',
    '!src/**/*.test.*.ts',
    '!src/**/*.test.tsx',
    '!src/**/*.mock.ts',
    '!src/**/*.mock.tsx',
  ];
  // allow jsx file in components/xxx/
  if (tsConfig.allowJs) {
    source.unshift('src/**/*.jsx');
  }

  // Strip content if needed
  let sourceStream = gulp.src(source);
  if (modules === false) {
    sourceStream = sourceStream.pipe(
      stripCode({
        start_comment: '@remove-on-es-build-begin',
        end_comment: '@remove-on-es-build-end',
      }),
    );
  }
  const transformFile = (file) => {
    return [];
  };

  sourceStream = sourceStream.pipe(
    through2.obj(function (file, encoding, next) {
      let nextFile = transformTSFile(file) || file;
      nextFile = Array.isArray(nextFile) ? nextFile : [nextFile];
      nextFile.forEach((f) => this.push(f));
      next();
    }),
  );

  const tsResult = sourceStream.pipe(
    ts(
      { ...tsConfig, isolatedModules: false },
      {
        error(e) {
          tsDefaultReporter.error(e);
          error = 1;
        },
        finish: tsDefaultReporter.finish,
      },
    ),
  );

  function check() {
    if (error && !argv['ignore-error']) {
      process.exit(1);
    }
  }

  tsResult.on('finish', check);
  tsResult.on('end', check);
  // tsResult.on('error', () => { /* Ignore compiler errors */ });
  const tsFilesStream = babelify(tsResult.js, modules);
  const tsd = tsResult.dts.pipe(gulp.dest(modules === false ? esDir : libDir));
  return merge2([less, json, tsFilesStream, tsd, transformFileStream].filter((s) => s));
}

function babelify(js, modules) {
  const babelConfig = getBabelCommonConfig(modules);
  delete babelConfig.cacheDirectory;
  if (modules === false) {
    babelConfig.plugins.push(replaceLib);
  }
  const stream = js.pipe(babel(babelConfig)).pipe(
    through2.obj(function z(file, encoding, next) {
      this.push(file.clone());
      next();
    }),
  );
  return stream.pipe(gulp.dest(modules === false ? esDir : libDir));
}

function moveWorkerJs(file) {
  const workerPath = file.includes('x_json')
    ? `/packages/kbn-ace/src/ace/modes/x_json/worker`
    : `/plugin/console/public/application/models/legacy_core_editor/mode/worker`;

  gulp
    .src([file])
    .pipe(gulp.dest(`${esDir}${workerPath}`))
    .pipe(gulp.dest(`${libDir}${workerPath}`));
}

gulp.task('compile-with-es', (done) => {
  console.log('[Parallel] Compile to es...');
  compile(false).on('finish', done);
});
gulp.task('compile-with-lib', (done) => {
  console.log('[Parallel] Compile to js...');
  compile().on('finish', done);
});
gulp.task('clean', (done) => {
  rimraf.sync(path.join(cwd, 'es'));
  rimraf.sync(path.join(cwd, 'lib'));
  done();
});

gulp.task('move-ace-worker', (done) => {
  moveWorkerJs('worker/worker.js');
  done();
});
gulp.task('move-ace-x-json-worker', (done) => {
  moveWorkerJs('worker/x_json.ace.worker.js');
  done();
});

gulp.task(
  'compile',
  gulp.series(
    'clean',
    gulp.parallel('compile-with-es', 'compile-with-lib'),
    gulp.parallel('move-ace-worker', 'move-ace-x-json-worker'),
  ),
);
