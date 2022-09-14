const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const rimraf = require('rimraf');
const ts = require('gulp-typescript');
const merge2 = require('merge2');
const babel = require('gulp-babel');
const argv = require('minimist')(process.argv.slice(2));

const cwd = process.cwd();
const libDir = path.join(cwd, 'lib');
const esDir = path.join(cwd, 'es');
const tsDefaultReporter = ts.reporter.defaultReporter();

const tsConfig = require('../../scripts/build/getTSCommonConfig')();
const getBabelCommonConfig = require('../../scripts/build/getBabelCommonConfig');
const replaceLib = require('../../scripts/build/replaceLib');

function compile(modules) {
  rimraf.sync(modules !== false ? libDir : esDir);
  // =============================== Iconfont File ===============================

  const iconfont = gulp
    .src(['components/**/*/iconfont.*'])
    .pipe(gulp.dest(modules === false ? esDir : libDir));

  let error = 0;

  // ================================ TS ================================
  const source = [
    'components/**/*.tsx',
    'components/**/*.ts',
    'components/**/*.js',
    'typings/**/*.d.ts',
    '!components/**/__tests__/**',
    '!components/**/*.test.ts',
    '!components/**/*.test.*.ts',
    '!components/**/*.test.tsx',
    '!components/**/*.mock.ts',
    '!components/**/*.mock.tsx',
  ];

  let sourceStream = gulp.src(source);

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
  return merge2(
    [tsFilesStream, tsd, iconfont].filter((s) => s),
  );
}

function babelify(js, modules) {
  const babelConfig = getBabelCommonConfig(modules);
  delete babelConfig.cacheDirectory;
  if (modules === false) {
    babelConfig.plugins.push(replaceLib);
  }
  const stream = js.pipe(babel(babelConfig));
  return stream.pipe(gulp.dest(modules === false ? esDir : libDir));
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

gulp.task('compile', gulp.series('clean', gulp.parallel('compile-with-es', 'compile-with-lib')));
