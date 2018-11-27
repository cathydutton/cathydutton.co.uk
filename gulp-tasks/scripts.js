var project = require('./_project.js');
var gulp    = require('gulp');
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');
var gulpif = require('gulp-if')
var argv = require('yargs').argv
var isProd = (argv.prod === undefined) ? false : true;
var livereload = require('gulp-livereload');

// Uglify our javascript files into one.
gulp.task('scripts', function() {
  return gulp.src(project.buildSrc + "/js/**/*.js")
      .pipe(concat('scripts.js'))
      .pipe(gulpif(isProd, uglify({
        warnings: true,
      })))
      .pipe(gulp.dest(project.buildDest+ '/js'))
      .pipe(livereload());
});

// Copy scripts to dist folder
gulp.task('copyScripts', function() {
  return gulp.src(project.buildSrc + "/scripts/**/*.**")
      .pipe(gulp.dest(project.buildDest+ '/scripts'))
      .pipe(livereload());
});

