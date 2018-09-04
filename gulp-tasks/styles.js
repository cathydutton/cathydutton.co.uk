var project = require('./_project.js');
var gulp    = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import');
var csswring = require('csswring');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var concat = require('gulp-concat');
var isProd = (argv.prod === undefined) ? false : true;
var livereload = require('gulp-livereload');

/*
  Compile inline CSS 
*/
gulp.task('inline', function() {
  return gulp.src(project.buildSrc + '/css/inline.css')
  .pipe(postcss([
    autoprefixer,
    postcssImport
  ]))
    .pipe(gulpif(isProd, postcss([
      csswring
    ])
    ))
    .pipe(concat('inline.css'))
    .pipe(gulp.dest(project.buildSrc+ '/site/_includes'))
    .pipe(livereload());
});

/*
  Compile main CSS 
*/
gulp.task('main', function() {
  return gulp.src(project.buildSrc + '/css/main.css')
  .pipe(postcss([
    autoprefixer,
    postcssImport
  ]))
    .pipe(gulpif(isProd, postcss([
      csswring
    ])
    ))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(project.buildDest+ '/css'))
    .pipe(livereload());
});



/*
  Compile dev CSS files 
*/
gulp.task('styles', gulp.parallel(
  'main',
  'inline',
));




