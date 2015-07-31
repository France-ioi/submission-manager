// very simple compiler

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('css', function() {
  return gulp.src(['style.css'])
    .pipe(minifyCSS())
    .pipe(concat('submission-manager.min.css'))
    .pipe(gulp.dest('dst'));
});

gulp.task('hint', function() {
  return gulp.src(['js/recentSubmissionsCtrl.js','js/submissionCtrl.js','js/submissionManager.js','animation/animation.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('templates', function () {
    return gulp.src(['views/**/*html'])
        .pipe(templateCache({module: 'submission-manager'}))
        .pipe(gulp.dest('js'));
});

gulp.task('js', ['templates'], function() {
  return gulp.src(['js/submissionCtrl.js','js/submissionManager.js','animation/animation.js','js/templates.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('submission-manager.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dst'));
});

gulp.task('compile', ['css', 'js', 'templates']);
