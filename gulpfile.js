/* jshint strict: false */

var gulp = require('gulp'),
  //gutil = require('gulp-util'),
  compass = require('gulp-compass'),
  browserify = require('gulp-browserify'),
  concat = require('gulp-concat'),
  minifyCSS = require('gulp-minify-css'),
  del = require('del');

//Clean task
gulp.task('delete', function () {
  del.sync(['../table_U2Y_App/assets/www/**/*.*', '!../table_U2Y_App/assets/www/cordova.js', '!../table_U2Y_App/assets/www/Insomnia.js'], {
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

// Vendor task
gulp.task('vendor', function () {
  //styles angular-ui-mobile
  gulp.src('./bower_components/mobile-angular-ui/dist/css/*.min.css')
    .pipe(gulp.dest('../table_U2Y_App/assets/www/css'));
  //fonts
  gulp.src('./bower_components/mobile-angular-ui/dist/fonts/*.*')
    .pipe(gulp.dest('../table_U2Y_App/assets/www/fonts'));
  //Deplacement des librairies utilisées
  gulp.src('./js/libs/*js')
    .pipe(gulp.dest('../table_U2Y_App/assets/www/js/libs'));
  gulp.src('./bower_components/angular/angular.min.*')
    .pipe(gulp.dest('../table_U2Y_App/assets/www/js/libs'));
  gulp.src('./bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.min.js')
    .pipe(gulp.dest('../table_U2Y_App/assets/www/js/libs'));
});

// Browserify task
gulp.task('scripts', function () {
  //waiting for a solution like browserify.
  //creation du bundle de mes scripts
  gulp.src(['./js/mainLoader.js', './js/modelsLoader.js', './js/texturesLoader.js', './js/menu.js', './js/scene.js', './js/table.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('../table_U2Y_App/assets/www/js'));
  //Deplacement du script angular
  gulp.src('./js/angular.js')
    .pipe(gulp.dest('../table_U2Y_App/assets/www/js'));
  //Deplacement des datas pour le local (temporaire)
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
gulp.task('default', ['delete', '3Dfiles', 'vendor', 'compass', 'scripts', 'views', 'watch']);