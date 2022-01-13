const fs = require('fs');
const path = require('path');
const gulp = require('gulp')
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
const { cssInjection } = require('./scripts/build/styleUtil');



function compile(modules) {
    const includeLessFile = [/(\/|\\)components(\/|\\)style(\/|\\)default.less$/];
    rimraf.sync(modules !== false ? libDir : esDir);
    // =============================== LESS ===============================
    const less = gulp
        .src(['components/**/*.less'])
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
                    file.path.match(/(\/|\\)style(\/|\\)index\.less$/) ||
                    file.path.match(/(\/|\\)style(\/|\\)v2-compatible-reset\.less$/) ||
                    includeLessFile.some(regex => file.path.match(regex))
                ) {
                    transformLess(cloneCssFile.contents.toString(), cloneCssFile.path)
                        .then(css => {
                            cloneCssFile.contents = Buffer.from(css);
                            cloneCssFile.path = cloneCssFile.path.replace(/\.less$/, '.css');
                            this.push(cloneCssFile);
                            next();
                        })
                        .catch(e => {
                            console.error(e);
                        });
                } else {
                    next();
                }
            })
        )
        .pipe(gulp.dest(modules === false ? esDir : libDir));
    const assets = gulp
        .src(['components/**/*.@(png|svg)'])
        .pipe(gulp.dest(modules === false ? esDir : libDir));
    let error = 0;

    // =============================== FILE ===============================
    let transformFileStream;
    const transformTSFile = (file) => {
        if (file.path.match(/style(\/|\\)index\.tsx/)) {
            let content = file.contents.toString();

            if (content.includes('../../style/index.less') || content.includes('./index.less')) {
                const cloneFile = file.clone();

                // Origin
                content = content.replace('../../style/index.less', '../../style/default.less');
                cloneFile.contents = Buffer.from(content);

                return cloneFile;
            }
        }
    }

    transformFileStream = gulp
        .src(['components/**/*.tsx'])
        .pipe(
            through2.obj(function (file, encoding, next) {
                let nextFile = transformFile(file) || file;
                nextFile = Array.isArray(nextFile) ? nextFile : [nextFile];
                nextFile.forEach(f => this.push(f));
                next();
            })
        )
        .pipe(gulp.dest(modules === false ? esDir : libDir));

    // ================================ TS ================================
    const source = [
        'components/**/*.tsx',
        'components/**/*.ts',
        'typings/**/*.d.ts',
        '!components/**/__tests__/**',
    ];
    // allow jsx file in components/xxx/
    if (tsConfig.allowJs) {
        source.unshift('components/**/*.jsx');
    }

    // Strip content if needed
    let sourceStream = gulp.src(source);
    if (modules === false) {
        sourceStream = sourceStream.pipe(
            stripCode({
                start_comment: '@remove-on-es-build-begin',
                end_comment: '@remove-on-es-build-end',
            })
        );
    }
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
    }

    sourceStream = sourceStream.pipe(
        through2.obj(function (file, encoding, next) {
            let nextFile = transformTSFile(file) || file;
            nextFile = Array.isArray(nextFile) ? nextFile : [nextFile];
            nextFile.forEach(f => this.push(f));
            next();
        })
    );

    const tsResult = sourceStream.pipe(
        ts(tsConfig, {
            error(e) {
                tsDefaultReporter.error(e);
                error = 1;
            },
            finish: tsDefaultReporter.finish,
        })
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
    return merge2([less, tsFilesStream, tsd, assets, transformFileStream].filter(s => s));
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
                this.push(file);
                next();
            } else {
                next();
            }
        })
    );
    return stream.pipe(gulp.dest(modules === false ? esDir : libDir));
}
gulp.task('compile-with-es', done => {
    console.log('[Parallel] Compile to es...');
    compile(false).on('finish', done);
});
gulp.task('compile-with-lib', done => {
    console.log('[Parallel] Compile to js...');
    compile().on('finish', done);
});
gulp.task('clean', (done) => {
    rimraf.sync(path.join(cwd, 'es'));
    rimraf.sync(path.join(cwd, 'lib'));
    done();
});

gulp.task(
    'compile',
    gulp.series('clean', gulp.parallel('compile-with-es', 'compile-with-lib')));