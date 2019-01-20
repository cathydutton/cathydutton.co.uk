var project = require('./_project.js');
var gulp    = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import');
var csswring = require('csswring');
var postCSSCustomProperties = require('postcss-custom-properties');
var cssDeclarationSorter = require('css-declaration-sorter');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var concat = require('gulp-concat');
var isProd = (argv.prod === undefined) ? false : true;
var livereload = require('gulp-livereload');
var path = require('path');

/*
  Compile inline CSS 
*/
gulp.task('inline', function() {
  return gulp.src(project.buildSrc + '/css/inline.css')
  .pipe(postcss([
    postcssImport(),
    autoprefixer({ grid: false, browsers: ['>2%'] }),
    csswring(),
    cssDeclarationSorter({order: 'concentric-css'}),
    postCSSCustomProperties({strict: false, warnings: false, preserve: true}),
  ]))
    .pipe(concat('inline.css'))
    .pipe(gulp.dest(project.buildSrc+ '/site/_includes/css'))
    .pipe(gulp.dest(project.buildDest+ '/css'))
    .pipe(livereload());
});

/*
  Compile main CSS 
*/
gulp.task('main', function() {
  return gulp.src(project.buildSrc + '/css/main.css')
  .pipe(postcss([
    postcssImport(),
    autoprefixer({ grid: false, browsers: ['>2%'] }),
    postCSSCustomProperties({strict: false, warnings: false, preserve: true}),
    cssDeclarationSorter({order: 'concentric-css'}),
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
  Compile components 
*/

gulp.task('components', function() {
  return gulp.src(project.buildSrc + '/css/6-components/**.css')
  .pipe(postcss([
    postcssImport(),
    autoprefixer({ grid: false, browsers: ['>2%'] }),
    postCSSCustomProperties({strict: false, warnings: false, preserve: true}),
    cssDeclarationSorter({order: 'concentric-css'}),
  ]))
  .pipe(gulp.dest(project.buildSrc+ '/site/_includes/css'))
  .pipe(livereload());
});

/*
  Compile dev CSS files 
*/
gulp.task('styles', gulp.parallel(
  'main',
  'inline',
  'components',
));




