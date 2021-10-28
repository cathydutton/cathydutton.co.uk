var project = require('./_project.js');
var gulp    = require('gulp');
var access = require('gulp-accessibility');
var rename = require("gulp-rename");
var postcss = require('gulp-postcss');
var stylelint = require('stylelint');
var eslint = require('gulp-eslint');

var jsValidate = require('gulp-jsvalidate')


/*
  Run CSS lint 
*/
gulp.task('cssLint', function() {
  return gulp.src(project.buildSrc + '/css/**/**.css')
  .pipe(postcss([
    stylelint({ failAfterError: true, fix: true})
  ]))
});



/*
  Run a11y (check HTML) 
*/
gulp.task('a11y', function() {
  return gulp.src(project.buildDest + '/**/**.html')
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
  return gulp.src(project.buildSrc + '/js/**.js')
  .pipe(jsValidate());
});

/*
  Run JS lint
*/
gulp.task('jsLint', function () {
  return gulp.src(project.buildSrc + '/js/**.js')
  .pipe(eslint.failAfterError());
});


/*
  Run all tests 
*/
gulp.task('test', gulp.parallel(
  'cssLint',
  'a11y',
  'jsTest',
  'jsLint'
));


