var project     = require('./_project.js');
var gulp        = require('gulp');
var imagemin = require('gulp-imagemin');

// Copy our core images to the dist folder, and resize all preview images
gulp.task('images', function() {
  gulp.src(project.buildSrc + '/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest(project.buildDest+ '/images'))
});

