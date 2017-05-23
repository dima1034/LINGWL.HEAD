/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('scss:dev', function () {
    gulp.src('./wwwroot/src/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./wwwroot/dist/styles'));
});

gulp.task('scss:prod', function () {
    gulp.src('./wwwroot/src/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./wwwroot/dist/styles'));
});

gulp.task('scss:watch', function () {
    gulp.watch('./wwwroot/src/styles/*.scss', ['scss:dev']);
});

gulp.task('default', []);