var project = require('./_project.js');
var gulp    = require('gulp');
var csslint = require('gulp-csslint');
var access = require('gulp-accessibility');
var mocha = require('gulp-mocha');
var rename = require("gulp-rename");

/*
  Run CSS lint 
*/
gulp.task('cssLint', function() {
  return gulp.src(project.buildSrc + '/css/**/**.css')
  .pipe(csslint())
  .pipe(csslint.formatter())
  .pipe(csslint.formatter('fail')); 
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
    .pipe(gulp.dest('reports/txt'));
});


/*
  Run Mocha (check JS)
*/
gulp.task('mocha', function () {
  return gulp.src(project.buildSrc + '/js/**/**.js')
  .pipe(mocha({reporter: 'nyan'}))
});


/*
  Compile dev CSS files 
*/
gulp.task('test', gulp.parallel(
  'cssLint',
  'a11y',
  'mocha'
));
