var project = require('./_project.js');
var gulp    = require('gulp');
var livereload = require('gulp-livereload');

/*
  Watch folders for changes
*/
gulp.task("watch", function () {
  livereload.listen();
  gulp.watch(project.buildSrc + "/js/**/*", gulp.parallel('scripts'));
  gulp.watch(project.buildSrc + "/css/**/*", gulp.parallel('styles'));
  gulp.watch("src/site/**/**/**",  gulp.parallel('generate'));
  gulp.watch(project.buildSrc + "/images/**/*",  gulp.parallel('images'));
  'serve'
});
