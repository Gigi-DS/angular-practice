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
var plumber = require('gulp-plumber');

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
	.pipe(gulp.dest('public/lib'));
});

// copying less files
gulp.task('bootstrap:prepareLess', ['bower'], function() {
  return gulp.src('less/bootstrap/variables.less')
    .pipe(gulp.dest('public/lib/bootstrap/less'));
});
gulp.task('bootstrap:compileLess', ['bootstrap:prepareLess'], function() {
  return gulp.src('public/lib/bootstrap/less/bootstrap.less')
    .pipe(less())
    .pipe(gulp.dest('public/lib/bootstrap/dist/css'));
});



/*===     .BOOTSTRAP   ====*/


// concatinatind ang minifying css
gulp.task('minifyCss',function(){
	return gulp.src('content/css/*.css')
	.pipe(sourcemaps.init())
	.pipe(concat('style.css'))
	.pipe(rename({suffix: '.min'}))
	.pipe(minifyCss({compatibility: 'ie8'}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('content'));
});


// concatinating ang uglifying js files

//app scripts
gulp.task('appscripts',function(){
    //all js files from angular app (app folder)
	return gulp.src('app/**/*.js')
    .pipe(plumber())
	.pipe(sourcemaps.init({ loadMaps: true }))
	.pipe(concat('appScripts.js'))
	.pipe(uglify())
    .pipe(rename({suffix: '.min'}))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('scripts/js'));
});

//all js
gulp.task('scripts',[],function(){
	return gulp.src(['app/**/*.js', 'scripts/js/*.js'])
    .pipe(plumber())
	.pipe(sourcemaps.init({ loadMaps: true }))
	.pipe(concat('scripts.js'))
	.pipe(uglify())
    .pipe(rename({suffix: '.min'}))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('scripts'));
});


// coping jquery
gulp.task('jquery',function(){
	return gulp.src('bower_components/jquery/dist/jquery.js')
	.pipe(sourcemaps.init())
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('scripts/plugins'));
});

// coping angular js
gulp.task('angular',['angular-route','angular-resource','angular-animate'],function(){
	return gulp.src('bower_components/angular/angular.js')
	.pipe(sourcemaps.init())
	.pipe(rename({suffix:".min"}))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('scripts/plugins'));
});


// coping angular route
gulp.task('angular-route',function(){
	return gulp.src('bower_components/angular-route/angular-route.js')
	.pipe(sourcemaps.init())
	.pipe(rename({suffix:".min"}))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('scripts/plugins'));
});

// coping angular resource
gulp.task('angular-resource',function(){
	return gulp.src('bower_components/angular-resource/angular-resource.js')
	.pipe(sourcemaps.init())
	.pipe(rename({suffix:".min"}))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('scripts/plugins'));
});

// coping angular animate
gulp.task('angular-animate',function(){
	return gulp.src('bower_components/angular-animate/angular-animate.js')
	.pipe(sourcemaps.init())
	.pipe(rename({suffix:".min"}))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('scripts/plugins'));
});

// coping angular resource
gulp.task('pagination',function(){
	return gulp.src('bower_components/angular-utils-pagination/dirPagination.js')
	.pipe(sourcemaps.init())
	.pipe(rename({suffix:".min"}))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('scripts/plugins'));
});


// watch and reload browser task
gulp.task('serve', ['minifyCss','scripts'], function() {


    gulp.watch("content/css/*.css", ['minifyCss']);
    gulp.watch("content/style.min.css").on('change', browserSync.reload);
    gulp.watch("./app/**/*.js", ['scripts']);
    gulp.watch("scripts/scripts.min.js").on('change', browserSync.reload);
    gulp.watch("./**/*.html").on('change', browserSync.reload);
    gulp.watch("./**/*.json").on('change', browserSync.reload);
    
    browserSync.init({
        server: "./"
    });
});

// watch task
gulp.task('watch',function(){
	gulp.watch(['less/bootstrap/variables.less'], ['bootstrap:compileLess']);
});

