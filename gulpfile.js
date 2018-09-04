var gulp  = require('gulp');
var shell = require('gulp-shell');

/**
  Our gulp tasks live in their own files,
  for the sake of clarity.
 */
require('require-dir')('./gulp-tasks');


/*
 Run our static site generator to build the pages
*/
gulp.task('generate', shell.task('eleventy'), 
);



/*
  compile the assets to the correct destination
*/
gulp.task('assets', gulp.parallel(
  'images',
  'styles',
  'scripts'
));


/*
  Build 
*/
gulp.task('build', gulp.series(
  'clean-build',
  'generate',
  'assets'
));


