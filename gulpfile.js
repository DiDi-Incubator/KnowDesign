const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const rimraf = require('rimraf');
// https://www.npmjs.com/package/through2
const through2 = require('through2');
// const replace = require('gulp-replace');

const ts = require('gulp-typescript');
// const cssmin = require('gulp-cssmin');
const merge2 = require('merge2');
const stripCode = require('gulp-strip-code');
const babel = require('gulp-babel');
const argv = require('minimist')(process.argv.slice(2));

// 输出文件夹
const cwd = process.cwd();
const libDir = path.join(cwd, 'lib');
const esDir = path.join(cwd, 'es');
const dist = path.join(cwd, 'dist');

const tsDefaultReporter = ts.reporter.defaultReporter();
const tsConfig = require('./scripts/build/getTSCommonConfig')();
const transformLess = require('./scripts/build/transformLess');
const getBabelCommonConfig = require('./scripts/build/getBabelCommonConfig');
const replaceLib = require('./scripts/build/replaceLib');
const { cssInjection } = require('./scripts/build/styleUtil');

// 需要拍扁的目录
const flatDirs = ['basic', 'extend', 'common-pages'];

// 处理打包后文件相对引用路径，使得目录拍平后文件能引用到正确的位置
function transformRelativeLink(file, prefix) {
  const filePath = file.path;
  const isPathIncludesFlatDirs = flatDirs.some((dir) => filePath.includes(`${prefix}/${dir}`));
  let contents = file.contents.toString().replace(/^\uFEFF/, '');

  // 对 less 的相对路径进行兼容处理
  if (filePath.includes('.less') && isPathIncludesFlatDirs) {
    contents = contents.replace(/\.\.\/\.\.\/\.\.\/style/g, '../../style');
  }
  // 对 js 文件的相对路径进行兼容处理
  if (
    filePath.includes('.tsx') ||
    filePath.includes('.jsx') ||
    filePath.includes('.ts') ||
    filePath.includes('.js')
  ) {
    if (isPathIncludesFlatDirs) {
      contents = contents.replace(/\.\.\/\.\.\/locale/g, '../locale');
      flatDirs.forEach((dir) => {
        const reg = new RegExp(`\.\.\/${dir}\/`, 'g');
        contents = contents.replace(reg, '');
      });
    } else {
      flatDirs.forEach((dir) => {
        const reg = new RegExp(`${dir}\/`, 'g');
        contents = contents.replace(reg, '');
      });
    }
  }

  file.contents = Buffer.from(contents);
}

// 目录拍平
function flatOutputPath(file, prefix = '/components') {
  if (!file.path) return;

  transformRelativeLink(file, prefix);

  let replaceStr = '';
  flatDirs.some((dir) => {
    const flatPath = `${prefix}/${dir}`;
    if (file.path.includes(flatPath)) {
      replaceStr = flatPath;
      return true;
    }
  });

  if (replaceStr) {
    file.path = file.path.replace(replaceStr, prefix);
  }
}

// 打包入口
function compile(modules) {
  const includeLessFile = [/(\/|\\)components(\/|\\)style(\/|\\)default.less$/];
  // =============================== LESS ===============================
  // 1. 输出不变的 less 文件和转换后的 css 文件
  const less = gulp
    .src(['components/**/*.less'])
    .pipe(
      through2.obj(function (file, encoding, next) {
        // Replace content
        const cloneFile = file.clone();
        // 去除特殊字符
        let content = file.contents.toString().replace(/^\uFEFF/, '');

        cloneFile.contents = Buffer.from(content);

        // Clone for css here since `this.push` will modify file.path
        const cloneCssFile = cloneFile.clone();

        flatOutputPath(cloneFile);
        this.push(cloneFile);

        // Transform less file
        if (
          file.path.match(/(\/|\\)style(\/|\\)index\.less$/) ||
          file.path.match(/(\/|\\)style(\/|\\)v2-compatible-reset\.less$/) ||
          includeLessFile.some((regex) => file.path.match(regex))
        ) {
          // 输出 less -> css 转换后的文件
          transformLess(cloneCssFile.contents.toString(), cloneCssFile.path)
            .then((css) => {
              cloneCssFile.contents = Buffer.from(css);
              cloneCssFile.path = cloneCssFile.path.replace(/\.less$/, '.css');
              flatOutputPath(cloneCssFile);
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

  // =============================== RESOURCES ===============================
  // 2. 查找输出 png | svg | iconfont 资源
  const assets = gulp
    .src(['components/**/*.@(png|svg)', 'components/**/*/iconfont.*'])
    .pipe(
      through2.obj(function (file, encoding, next) {
        flatOutputPath(file);
        this.push(file);
        next();
      }),
    )
    .pipe(gulp.dest(modules === false ? esDir : libDir));

  // =============================== JSON FILE ===============================
  const json = gulp
    .src(['components/**/*.json'])
    .pipe(
      through2.obj(function (file, encoding, next) {
        // Replace content
        const cloneFile = file.clone();
        const content = file.contents.toString().replace(/^\uFEFF/, '');

        cloneFile.contents = Buffer.from(content);

        flatOutputPath(cloneFile);
        this.push(cloneFile);
        next();
      }),
    )
    .pipe(gulp.dest(modules === false ? esDir : libDir));

  let error = 0;

  // =============================== FILE ===============================
  let transformFileStream;
  const transformFile = (file) => {
    if (file.path.match(/style(\/|\\)index\.tsx/)) {
      const indexLessFilePath = file.path.replace('index.tsx', 'index.less');

      if (fs.existsSync(indexLessFilePath)) {
        // We put origin `index.less` file to `index-pure.less`
        const pureFile = file.clone();
        pureFile.contents = Buffer.from(fs.readFileSync(indexLessFilePath, 'utf8'));
        pureFile.path = pureFile.path.replace('index.tsx', 'index-pure.less');

        // Rewrite `index.less` file with `root-entry-name`
        const indexLessFile = file.clone();
        indexLessFile.contents = Buffer.from(
          [
            // Inject variable
            '@root-entry-name: default;',
            // Point to origin file
            "@import './index-pure.less';",
          ].join('\n\n'),
        );
        indexLessFile.path = indexLessFile.path.replace('index.tsx', 'index.less');

        return [indexLessFile, pureFile];
      }
    }

    return [];
  };

  transformFileStream = gulp
    .src(['components/**/*.tsx'])
    .pipe(
      through2.obj(function (file, encoding, next) {
        let nextFile = transformFile(file) || file;
        nextFile = Array.isArray(nextFile) ? nextFile : [nextFile];
        nextFile.forEach((f) => {
          flatOutputPath(f);
          this.push(f);
        });
        next();
      }),
    )
    .pipe(gulp.dest(modules === false ? esDir : libDir));

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
  // allow jsx file in components/xxx/
  if (tsConfig.allowJs) {
    source.unshift('components/**/*.jsx');
  }

  const transformTSFile = (file) => {
    if (file.path.match(/style(\/|\\)index\.tsx/)) {
      let content = file.contents.toString();

      if (content.includes('../../../style/index.less') || content.includes('./index.less')) {
        const cloneFile = file.clone();

        // Origin
        content = content.replace('../../../style/index.less', '../../style/default.less');
        cloneFile.contents = Buffer.from(content);

        return cloneFile;
      }
    }
  };

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
  const tsd = tsResult.dts
    .pipe(
      through2.obj(function (file, encoding, next) {
        flatOutputPath(file, '/dist');
        this.push(file);
        next();
      }),
    )
    .pipe(gulp.dest(modules === false ? esDir : libDir));

  return merge2([less, json, tsFilesStream, tsd, assets, transformFileStream].filter((s) => s));
}

// es/lib 入口文件的导出去掉 flat 前缀
function changeEntryFilePath(modules) {
  gulp
    .src([
      `${modules === false ? esDir : libDir}/index.js`,
      `${modules === false ? esDir : libDir}/index.d.ts`,
      `${modules === false ? esDir : libDir}/style/components.less`,
    ])
    // .pipe(replace())
    .pipe(
      through2.obj(function (file, encoding, next) {
        const cloneEntryFile = file.clone();
        let content = cloneEntryFile.contents.toString().replace(/^uFEFF/, '');
        flatDirs.map((dirName) => {
          const reg = new RegExp(`./${dirName}`, 'g');
          content = content.replace(reg, '.');
        });
        cloneEntryFile.contents = Buffer.from(content);
        this.push(cloneEntryFile);
        next();
      }),
    )
    .pipe(gulp.dest(modules === false ? esDir : libDir));
}

function compileLess() {
  gulp
    .src(['components/style/index.less'])
    .pipe(
      through2.obj(function (file, encoding, next) {
        // Replace content
        const cloneFile = file.clone();
        const content = file.contents.toString().replace(/^\uFEFF/, '');

        cloneFile.contents = Buffer.from(content);

        // Clone for css here since `this.push` will modify file.path
        const cloneCssFile = cloneFile.clone();
        // Transform less file
        if (
          file.path.match(/(\/|\\)style(\/|\\)index\.less$/) ||
          file.path.match(/(\/|\\)style(\/|\\)v2-compatible-reset\.less$/) ||
          includeLessFile.some((regex) => file.path.match(regex))
        ) {
          transformLess(cloneCssFile.contents.toString(), cloneCssFile.path)
            .then((css) => {
              const extendCSS = fs.readFileSync(path.join(dist, 'index.umd.css'));
              rimraf.sync(path.join(dist, 'index.umd.css'));
              cloneCssFile.contents = Buffer.concat([Buffer.from(css), extendCSS]);
              cloneCssFile.path = cloneCssFile.path.replace(/\.less$/, '.umd.css');
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
    .pipe(gulp.dest(dist))
    .pipe(cssmin())
    .pipe(
      through2.obj(function (file, encoding, next) {
        const cloneFile = file.clone();
        cloneFile.path = cloneFile.path.replace(/\.css$/, '.min.css');
        this.push(cloneFile);
        next();
      }),
    )
    .pipe(gulp.dest(dist));
}

function babelify(js, modules) {
  const babelConfig = getBabelCommonConfig(modules);
  delete babelConfig.cacheDirectory;
  if (modules === false) {
    babelConfig.plugins.push(replaceLib);
  }
  const stream = js.pipe(babel(babelConfig)).pipe(
    through2.obj(function z(file, encoding, next) {
      const cloneFile = file.clone();
      flatOutputPath(cloneFile, '/dist');
      this.push(cloneFile);
      if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
        const content = file.contents.toString(encoding);
        if (content.indexOf("'react-native'") !== -1) {
          // actually in antd-mobile@2.0, this case will never run,
          // since we both split style/index.mative.js style/index.js
          // but let us keep this check at here
          // in case some of our developer made a file name mistake ==
          next();
          return;
        }

        file.contents = Buffer.from(cssInjection(content));
        file.path = file.path.replace(/index\.js/, 'css.js');
        flatOutputPath(file, '/dist');
        this.push(file);
        next();
      } else {
        next();
      }
    }),
  );
  return stream.pipe(gulp.dest(modules === false ? esDir : libDir));
}
gulp.task('compile-with-es', (done) => {
  console.log('[Parallel] Compile to es...');
  compile(false).on('finish', () => {
    changeEntryFilePath(false);
    done();
  });
});
gulp.task('compile-with-lib', (done) => {
  console.log('[Parallel] Compile to js...');
  compile().on('finish', () => {
    changeEntryFilePath();
    done();
  });
});
gulp.task('clean', (done) => {
  rimraf.sync(path.join(cwd, 'es'));
  rimraf.sync(path.join(cwd, 'lib'));
  done();
});

gulp.task('compile', gulp.series('clean', gulp.parallel('compile-with-es', 'compile-with-lib')));

gulp.task('compileLess', (done) => {
  compileLess();
  done();
});
