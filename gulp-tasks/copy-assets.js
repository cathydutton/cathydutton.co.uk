var project = require('./_project.js');
var gulp    = require('gulp');
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');
var gulpif = require('gulp-if')
var argv = require('yargs').argv
var isProd = (argv.prod === undefined) ? false : true;
var livereload = require('gulp-livereload');

// Copy scripts to dist folder
gulp.task('copyScripts', function() {
  return gulp.src(project.buildSrc + "/scripts/**/*.**")
      .pipe(gulp.dest(project.buildDest+ '/'))
      .pipe(livereload());
});

// Copy fonts to dist fonts folder
gulp.task('copyFonts', function() {
  return gulp.src(project.buildSrc + "/fonts/**/*.**")
      .pipe(gulp.dest(project.buildDest+ '/fonts'))
      .pipe(livereload());
});



