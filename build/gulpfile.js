const path = require('path');
const gulp = require('gulp');
const webpack = require('webpack');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const merge2 = require('merge2');
const rimraf = require('rimraf');
const tsConfig = require('./getTypescriptConfig')();
const getBabelConfig = require('./getBabelConfig');

const tsDefaultReporter = ts.reporter.defaultReporter();
const cwd = process.cwd();
const libDir = path.join(cwd, 'lib');
const esDir = path.join(cwd, 'es');

function babelify(js, isES) {
  const dir = isES ? esDir : libDir;
  return js.pipe(babel(getBabelConfig(isES)))
    .pipe(gulp.dest(dir));
}

function compile(isES) {
  const dir = isES ? esDir : libDir;
  rimraf.sync(dir);
  const source = [
    'src/**/*.{ts,tsx}',
  ];

  const declaration = gulp.src(['src/*.d.ts'])
    .pipe(gulp.dest(dir));

  const tsResult = gulp.src(source)
    .pipe(ts(tsConfig, {
      error(e) {
        tsDefaultReporter.error(e);
        process.exit(1);
      },
      finish: tsDefaultReporter.finish,
    }));
  const tsFilesStream = babelify(tsResult.js, isES);
  const tsd = tsResult.dts.pipe(gulp.dest(dir));
  return merge2([tsFilesStream, tsd, declaration]);
}

gulp.task('compile', ['compile-es'], () => {
  compile();
});

gulp.task('compile-es', () => {
  compile(true);
});
