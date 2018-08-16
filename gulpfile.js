/// <binding BeforeBuild='build' />
/**
 * Project: Posto Fácil Vale
 * Author: Shermam Xavier Miranda
 * email: shermam.miranda@ihm.com.br
 */

var gulp = require('gulp');


/**
 * Gulp Html Minifier
 *
 * Creates a minimal version of the html for performance purposes
 * 
 * @type {Object}
 */
var htmlmin = require('gulp-htmlmin');

/**
 * Gulp Sourcemaps
 *
 * Creates a map file for to enable the browsers to map the
 * minified version of the files to the original version
 * 
 * @type {Object}
 */
var sourcemaps = require('gulp-sourcemaps');

/**
 * Gulp Clean CSS
 *
 * Minifies the CSS Files
 * 
 * @type {Object}
 */
var cleanCSS = require('gulp-clean-css');

/**
 * Gulp Concat
 *
 * Concatenates files
 * 
 * @type {Object}
 */
var concat = require('gulp-concat');

/**
 * Gulp Uglify
 *
 * Minifies Js files
 * 
 * @type {Object}
 */
var uglify = require('gulp-uglify');

/**
 * Gulp Strip Comments
 *
 * Removes coment blocks from the code
 * 
 * @type {Object}
 */
var strip = require('gulp-strip-comments');

/**
 * Gulp Angular Templatecache
 *
 * Creates Angular templatecache files from html
 * 
 * @type {Object}
 */
var templateCache = require('gulp-angular-templatecache');

/**
 * Build Task
 *
 * This task will start all the other build tasks in sequence
 */
gulp.task('build', [
	'build-index',
	'build-css',
	'build-libs-css',
	'build-libs-js',
	'build-js',
	'build-templates',
	'move-img'
]);

/**
 * Build Inex.html task
 *
 * Minifies the HTML and copies it to the dist folder.
 */
gulp.task('build-index', function () {

    //Sets the 'src/index.html' as the file to be minified
    return gulp.src('src/index.html')

		//Remove comments from the file
		.pipe(strip())

		//Minifies the file
	  	.pipe(htmlmin({ collapseWhitespace: true }))

	  	//Sends it to the dist folder 
		.pipe(gulp.dest('dist'))
});

/**
 * Build Libs JS task
 *
 * Concatenates and moves the JS Libraries to the dist folder
 */
gulp.task('build-libs-js', function () {

    //JS Libraries to be concatenated
    var libs = [
		"./node_modules/angular/angular.min.js",
		"./node_modules/angular-aria/angular-aria.min.js",
		"./node_modules/angular-animate/angular-animate.min.js",
		"./node_modules/angular-material/angular-material.min.js",
		"./node_modules/angular-ui-router/release/angular-ui-router.min.js",
		"./node_modules/angular-messages/angular-messages.min.js",
		"./node_modules/angular-filter/dist/angular-filter.min.js"
    ];

    return gulp.src(libs)

		//Starts the creation of the maps file
		.pipe(sourcemaps.init())

		//Concatenates all files in the files array into a lib.css file
		.pipe(concat('lib.js'))

		//Ends the creation of the maps file
		.pipe(sourcemaps.write('.'))

		//Sends it to the dist folder 
		.pipe(gulp.dest('dist/js'))
});

/**
 * Build JS task
 *
 * Minifies, concatenates and moves the JS Libraries to the dist folder
 */
gulp.task('build-js', function () {

    //Affects all js files under 'src/js'
    return gulp.src('src/js/**/*.js')

		//Starts the creation of the maps file	
		.pipe(sourcemaps.init())

		//Minifies the files
		.pipe(uglify())

		//Concatenates all files in the files array into a lib.css file
		.pipe(concat('main.js'))

		//Ends the creation of the maps file
		.pipe(sourcemaps.write('.'))

		//Sends it to the dist folder
		.pipe(gulp.dest('dist/js'))
});

/**
 * Build Templates
 *
 * Task to compile angular templates
 */
gulp.task('build-templates', function () {

    //Affects all html files under 'src/templates'
    return gulp.src('src/templates/**/*.html')

		//Remove comments from the file
		.pipe(strip())

		//Minifies the html
		.pipe(htmlmin({ collapseWhitespace: true }))

		//Puts all templates in an Angular js template cache file
		.pipe(templateCache({ module: 'app' }))

		//Starts the creation of the maps file	
		.pipe(sourcemaps.init())

		//Minifies the files
		.pipe(uglify())

		//Ends the creation of the maps file
		.pipe(sourcemaps.write('.'))

		//Sends it to the dist folder
		.pipe(gulp.dest('dist/js'))
});

/**
 * Move Images
 *
 * Task to move images to dist folder
 */
gulp.task('move-img', function () {

    //Moves all images to the dist/img folder
    gulp.src('src/img/*')
  		.pipe(gulp.dest('dist/img'));

});

/**
 * Build CSS task
 *
 * Minifies the CSS file
 */
gulp.task('build-css', function () {

    //Sets the 'src/index.html' as the file to be minified
    return gulp.src('./src/css/*.css')

		//Starts the creation of the maps file
		.pipe(sourcemaps.init())

		//Concatenates all files in the files array into a main.css file
		.pipe(concat('main.css'))

		//Minifies the CSS File
		.pipe(cleanCSS())

		//Ends the creation of the maps file	
		.pipe(sourcemaps.write('.'))

		//Sends it to the dist folder 
		.pipe(gulp.dest('dist/css'))

});

/**
 * Build Libs CSS task
 *
 * Concatenates and moves the CSS Libraries to the dist folder
 */
gulp.task('build-libs-css', function () {

    //CSS Libraries to be concatenated
    var files = [
		"./node_modules/angular-material/angular-material.min.css"
    ];

    return gulp.src(files)

		//Starts the creation of the maps file
		.pipe(sourcemaps.init())

		//Concatenates all files in the files array into a lib.css file
		.pipe(concat('lib.css'))

		//Ends the creation of the maps file
		.pipe(sourcemaps.write('.'))

		//Sends it to the dist folder 
		.pipe(gulp.dest('dist/css'))
});