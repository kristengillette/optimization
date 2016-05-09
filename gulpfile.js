// include gulp
var gulp = require('gulp'); 

// include plug-ins
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

var image = require('gulp-image');

// Image Reducing task
gulp.task('image', function () {
  gulp.src('./img/**/*')
    .pipe(image())
    .pipe(gulp.dest('./build/img'));
});
// JS hint task
gulp.task('jshint', function() {
  return gulp.src('./src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './img/**/*',
      imgDst = './build/img';

  return gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

// minify new or changed HTML pages
gulp.task('htmlpage', function() {
  var htmlSrc = '*.html',
      htmlDst = './build';

  return gulp.src(htmlSrc)
    .pipe(changed(htmlDst))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  return gulp.src(['./js/jquery.js', './js/fastclick.js', './js/foundation.js', './js/foundation.equalizer.js', './js/foundation.reveal.js', './js/custom.js'])
    .pipe(concat('app.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('styles', function() {
  return gulp.src(['./css/normalize.css','./css/foundation.min.css', './css/basics.css', './css/menu.css', './css/hero.css', './css/photo-grid.css', './css/modals.css', './css/footer.css', './css/custom.css'])
    .pipe(concat('style.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/css/'));
});

// default gulp task
// default gulp task
// default gulp task
gulp.task("default", ["image", "scripts", "styles"], function() {
  // watch for HTML changes
  gulp.watch('./*.html', ["htmlpage"]);
  // watch for JS changes
  gulp.watch('./js/*.js', ["jshint", "scripts"]);
  // watch for CSS changes
  gulp.watch('./css/*.css', ["styles"]);
});