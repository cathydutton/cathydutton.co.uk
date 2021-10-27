var gulp  = require('gulp');
var shell = require('gulp-shell');
// var livereload = require('gulp-livereload');

/**
  Our gulp tasks live in their own files,
  for the sake of clarity.
 */
require('require-dir')('./gulp-tasks');


/*
 Run our static site generator to build the pages
*/

gulp.task('generate', () => {
  return gulp.src('*.js', {read: false})
  .pipe(shell([
    'eleventy'
  ])) 
  // .pipe(livereload());
})


/*
  compile the assets to the correct destination
*/
gulp.task('assets', gulp.parallel(
  'images',
  'styles',
  'scripts',
  'copyScripts',
  'copyFonts'
));


/*
  Build 
*/
gulp.task('build', gulp.series(
  'generate',
  'assets'
));

/*
  Production 
*/
gulp.task('production', gulp.series(
  'test',
  'build'
));


