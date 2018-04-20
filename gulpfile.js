var gulp = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect');

var htmlSources = ['*.html'];
var jsSources = ['*.js'];
gulp.task('connect', function () {
    connect.server({
        livereload:true
    });
});
gulp.task('html', function () {
    gulp.src(htmlSources)
    .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(htmlSources, ['html']);
    gulp.watch(jsSources, ['js']);
});

gulp.task('js', function () {
    gulp.src(jsSources)
        .pipe(connect.reload());
});

gulp.task('default', ['html', 'connect', 'watch', 'js']);