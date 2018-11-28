var project = require('./_project.js');
var gulp    = require('gulp');
var access = require('gulp-accessibility');
var jsValidate = require('gulp-jsvalidate');
var rename = require("gulp-rename");
var postcss = require('gulp-postcss');
var stylelint = require('stylelint');

/*
  Run CSS lint 
*/
gulp.task('cssLint', function() {
  return gulp.src(project.buildSrc + '/css/**/**.css')
  .pipe(postcss([
    stylelint({ failAfterError: true})
  ]))
});



/*
  Run a11y (check HTML) 
*/
gulp.task('a11y', function() {
  return gulp.src(project.buildDest + '**/**.html')
    .pipe(access({
      force: false
    }))
    .on('error', console.log)
    .pipe(access.report({reportType: 'txt'}))
    .pipe(rename({
      extname: '.txt'
    }))
    .pipe(gulp.dest(project.buildDest + '/reports/txt'));
});


/*
  Run JS validate
*/
gulp.task('jsTest', function () {
  return gulp.src(project.buildSrc + '/js/**/**.js')
  .pipe(jsValidate())
});


/*
  Run all tests 
*/
gulp.task('test', gulp.parallel(
  'cssLint',
  'a11y',
  'jsTest'
));
