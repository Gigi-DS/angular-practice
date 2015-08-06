/**
 * @author Admin
 */
// include gulp
var gulp = require('gulp');

// include plugins
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var mainBowerFiles = require('main-bower-files');
var less = require('gulp-less');
var path = require('path');

/*===     BOOTSTRAP   ====*/

// bootstrap copy variables.less
gulp.task('variablesLess',function(){
	return gulp.src('bower_components/bootstrap/less/variables.less')
	.pipe(gulp.dest('less/bootstrap'));
});

// coping bootstrap files to public/lib directory
gulp.task('bower',function(){
	return gulp.src(mainBowerFiles(),{
		base: 'bower_components'
	})
	.pipe(gulp.dest('app/public/lib'));
});

// copying less files
gulp.task('bootstrap:prepareLess', ['bower'], function() {
  return gulp.src('less/bootstrap/variables.less')
    .pipe(gulp.dest('app/public/lib/bootstrap/less'));
});
gulp.task('bootstrap:compileLess', ['bootstrap:prepareLess'], function() {
  return gulp.src('app/public/lib/bootstrap/less/bootstrap.less')
    .pipe(less())
    .pipe(gulp.dest('app/public/lib/bootstrap/dist/css'));
});



/*===     .BOOTSTRAP   ====*/


// concatinatind ang minifying css
gulp.task('minifyCss',function(){
	return gulp.src('app/content/css/*.css')
	.pipe(sourcemaps.init())
	.pipe(concat('style.css'))
	.pipe(rename({suffix: '.min'}))
	.pipe(minifyCss({compatibility: 'ie8'}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('app/content'));
});


// concatinating ang uglifying js files
gulp.task('scripts',function(){
	return gulp.src('app/scripts/js/*.js')
	.pipe(sourcemaps.init())
	.pipe(concat('scripts.js'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('app/scripts'));
});


// coping jquery
gulp.task('jquery',function(){
	return gulp.src('bower_components/jquery/dist/jquery.js')
	.pipe(sourcemaps.init())
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('app/scripts/plugins'));
});

// coping angular js
gulp.task('angular',['angular-route'],function(){
	return gulp.src('bower_components/angular/angular.js')
	.pipe(sourcemaps.init())
	.pipe(rename({suffix:".min"}))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('app/scripts/plugins'));
});


// coping angular route
gulp.task('angular-route',function(){
	return gulp.src('bower_components/angular-route/angular-route.js')
	.pipe(sourcemaps.init())
	.pipe(rename({suffix:".min"}))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('app/scripts/plugins'));
});

// watch and reload browser task
gulp.task('serve', ['minifyCss', 'scripts'], function() {


    gulp.watch("app/content/css/*.css", ['minifyCss']);
    gulp.watch("app/content/style.min.css").on('change', browserSync.reload);
    gulp.watch("app/scripts/js/*.js", ['scripts']);
    gulp.watch("app/scripts/scripts.min.js").on('change', browserSync.reload);
    gulp.watch("app/**/*.html").on('change', browserSync.reload);
    gulp.watch("app/**/*.json").on('change', browserSync.reload);
    
    browserSync.init({
        server: "./app"
    });
});

// watch task
gulp.task('watch',function(){
	gulp.watch(['less/bootstrap/variables.less'], ['bootstrap:compileLess']);
});

