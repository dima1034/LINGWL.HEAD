/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var svgSymbols = require('gulp-svg-symbols');


gulp.task('scss:dev', function () {
    gulp.src('./wwwroot/src/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./wwwroot/dist/styles'));
});

gulp.task('scss:prod', function () {
    gulp.src('./wwwroot/src/styles/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./wwwroot/dist/styles'));
});

gulp.task('scss:watch', function () {
    gulp.watch('./wwwroot/src/styles/*.scss', ['scss:dev']);
});

//wont work properly

// gulp.task('sprites', function () {
//     return gulp.src('./wwwroot/src/assets/icon/*.svg')
//         .pipe(svgSymbols({
//             templates: [
                
//                 path.join(__dirname, './wwwroot/src/app/inline-svg/inline1-svg.css'),
//                 path.join(__dirname, './wwwroot/src/app/inline-svg/inline1-svg.html'),
//                 'default-svg',
//                 'default-css'
//             ],
//             className:  '.icon-%f',
//             id:         'icon-%f',
//             svgClassname: 'svg-icon-%f',
//         }))
//         .pipe(gulp.dest('./wwwroot/src/app/inline1-svg/'));
// });

gulp.task('default', []);