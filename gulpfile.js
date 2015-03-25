var gulp = require('gulp');

var concat = require('gulp-concat');
var gls = require('gulp-live-server');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
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
  var server = gls.static(['dist', 'refs']);
  server.start();
  //live reload changed resource(s)
  gulp.watch(['dist/**/*.css', 'dist/**/*.html', 'dist/**/*.js'], server.notify);
});

gulp.task('copy', function () {
  gulp.src(sources.html).pipe(gulp.dest(dests.html))
});

gulp.task('watch', function () {
  gulp.watch([sources.html, sources.js], ['build']);
});

gulp.task('traceur', function () {
  gulp.src(sources.js)
    .pipe(sourcemaps.init())
    .pipe(traceur())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dests.js));
});

gulp.task('build', ['copy', 'traceur']);
gulp.task('serve', runSequence('build', ['webserver', 'watch']));
