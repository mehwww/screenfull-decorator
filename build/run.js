const gulp = require('gulp');
const task = process.argv.slice(2)[0];

require('./gulpfile');

gulp.start(task);
