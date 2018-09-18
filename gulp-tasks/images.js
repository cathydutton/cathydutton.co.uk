var project     = require('./_project.js');
var gulp        = require('gulp');
var imagemin = require('gulp-imagemin');

gulp.task('images', function() {
  return gulp.src(project.buildSrc + '/images/**/**')
  .pipe(imagemin())
  .pipe(gulp.dest(project.buildDest+ '/images'))
});

