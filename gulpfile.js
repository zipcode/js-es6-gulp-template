var gulp = require('gulp');

var gls = require('gulp-live-server');
var runSequence = require('run-sequence');
var traceur = require('gulp-traceur');

var sources = {
  html: ['src/*.html'],
  js: ['src/js/*.js'],
};

var dests = {
  html: 'dist/',
  js: 'dist/js',
};

gulp.task('webserver', function() {
    var server = gls.static('dist');
    server.start();
    //live reload changed resource(s)
    gulp.watch(['dist/**/*.css', 'dist/**/*.html', 'dist/**/*.js'], server.notify);
});

gulp.task('copy', function () {
  gulp.src(sources.html).pipe(gulp.dest(dests.html))
});

gulp.task('watch', function () {
  gulp.watch(sources.html, ['build']);
});

gulp.task('build', ['copy']);
gulp.task('serve', ['webserver', 'watch']);