/* jshint strict: false */

var gulp = require('gulp'),
  //gutil = require('gulp-util'),
  compass = require('gulp-compass'),
  browserify = require('gulp-browserify'),
  concat = require('gulp-concat'),
  minifyCSS = require('gulp-minify-css'),
  del = require('delete');

//Clean task
gulp.task('delete', function () {
  del.sync('../table_U2Y_App/assets/www', {
    force: true
  });
});

// Compass task
gulp.task('compass', function () {
  gulp.src('./styles/sass/main.scss')
    .pipe(compass({
      css: './styles/css',
      sass: './styles/sass',
      image: './styles/images'
    }))
    .on('error', function (error) {
      // Would like to catch the error here
      console.log(error);
      this.emit('end');
    })
    .pipe(minifyCSS())
    .pipe(gulp.dest('../table_U2Y_App/assets/www/css'));
});

// Browserify task

gulp.task('scripts', function () {

  //waiting for a solution like browserify.
  gulp.src(['./js/mainLoader.js', './js/modelsLoader.js', './js/texturesLoader.js', './js/menu.js', './js/scene.js', './js/table.js', './js/controls.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('../table_U2Y_App/assets/www/js'));
  gulp.src('./js/libs/*js')
    .pipe(gulp.dest('../table_U2Y_App/assets/www/js/libs'));
  gulp.src('./js/angular.js')
    .pipe(gulp.dest('../table_U2Y_App/assets/www/js'));
  gulp.src('./bower_components/angular/angular.min.js')
    .pipe(gulp.dest('../table_U2Y_App/assets/www/js/libs'));
  gulp.src('./datas/*json')
    .pipe(gulp.dest('../table_U2Y_App/assets/www/datas'));
});

gulp.task('3Dfiles', function () {
  gulp.src('./object3D/**/*.*')
  // And put it in the dist folder
  .pipe(gulp.dest('../table_U2Y_App/assets/www/object3D'));
});

// Views task
gulp.task('views', function () {
  // Get our index.html
  gulp.src('./index.html')
  // And put it in the dist folder
  .pipe(gulp.dest('../table_U2Y_App/assets/www'));
});

//Global Watch function
gulp.task('watch', function () {

  // Watch our scripts
  gulp.watch(['./js/*.js', './js/**/*.js'], [
    'scripts'
  ]);

  // Watch our styles
  gulp.watch('./styles/sass/*.scss', ['compass']);

  // Watch our views
  gulp.watch(['./index.html'], [
    'views'
  ]);
});

// Default Task
gulp.task('default', ['delete', '3Dfiles', 'compass', 'scripts', 'views', 'watch']);