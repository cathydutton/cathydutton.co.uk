var project = require('./_project.js');
var gulp    = require('gulp');
var livereload = require('gulp-livereload');

/*
  Watch folders for changess
*/
gulp.task("watch", function () {
  livereload.listen();
  gulp.watch(project.buildSrc + "/js/**/*", gulp.parallel('scripts'));
  gulp.watch(project.buildSrc + "/css/**/*", gulp.parallel('styles'));
  gulp.watch(project.buildSrc + "/site/**/*",  gulp.parallel('generate'));
  'serve'
});
