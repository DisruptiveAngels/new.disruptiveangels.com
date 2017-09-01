// Dependencies.
var autoprefixer    = require('autoprefixer');
var browserSync     = require('browser-sync').create();
var del             = require('del');
var gulp            = require('gulp');
var gutil           = require('gulp-util');
var stylus          = require('gulp-stylus');
var postcss         = require('gulp-postcss');
var cssmin          = require('gulp-cssmin');
var imagemin        = require('gulp-imagemin');
var rename          = require('gulp-rename');
var run             = require('gulp-run');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var lost            = require('lost');
var rucksack        = require('rucksack-css');
var rupture         = require('rupture');
var reload          = browserSync.reload;

// Include paths file.
var paths = require('./paths');

// stylus - Compiles stylus file.
gulp.task('stylus', function() {
  var stylus_options = {
    use : [     
        rupture()
    ]
  }
  
  return gulp.src(paths.stylusAppFile)
    .pipe(stylus(stylus_options))
    .pipe(gulp.dest(paths.assetsDir));
});

// postcss - Run postcss processors.
gulp.task('postcss', function() {
  var processors = [
    rucksack,
    lost,
    autoprefixer ({
      browsers:['last 2 version']
    })
  ];

  return gulp.src(paths.assetsDir + 'app.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest(paths.assetsDir))
});

// mincss - Minify app.css file.
gulp.task ('mincss', function() {
  return gulp.src(paths.assetsDir + 'app.css')
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.jekyllCssDir))
    .pipe(gulp.dest(paths.siteCssDir));
});

// Styles:watch Task - Reloads html files
gulp.task('styles:watch', function(){
  return gulp.src(paths.stylusAppFile)
    .pipe(reload({ stream:true }));
});

// styles - Run styles tasks.
gulp.task('styles', gulp.series('stylus', 'postcss', 'mincss', 'styles:watch'));

// concatjs - Concatenates *.js files.
gulp.task ('concatjs', function() {
  return gulp.src([paths.jsVendorsDir, paths.jsModulesDir])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.assetsDir));
});

// uglify - Compress *.js files.
gulp.task('uglify', function() {
  return gulp.src(paths.assetsDir + 'app.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.jekyllJsDir))
    .pipe(gulp.dest(paths.siteJsDir));
});

// Scripts:watch Task - Reloads html files
gulp.task('scripts:watch', function(){
  return gulp.src(paths.scriptsPattern)
    .pipe(reload({ stream:true }));
});

// scripts - Run scripts tasks.
gulp.task('scripts', gulp.series('concatjs', 'uglify', 'scripts:watch'));

// images - Optimize images.
gulp.task('images', function() {
  return gulp.src(paths.imgPattern)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.jekyllImgDir));
});

// build:jekyll - Runs jekyll build command.
gulp.task('build:jekyll', function() {
  var shellCommand = 'bundle exec jekyll build';

  return gulp.src('./')
    .pipe(run(shellCommand))
    .on('error', gutil.log);
});

// Scripts:watch Task - Reloads html files
gulp.task('build:jekyll:watch', function(done){
  browserSync.reload();
  done();
});

// clean:jekyll - Deletes the entire _site directory.
gulp.task('clean:jekyll', function(callback) {
    del(['_site']);
    callback();
});

// Develop Task
gulp.task('jekyll:watch', gulp.series('build:jekyll', 'build:jekyll:watch'));

// build:assets - Build assets parallel
gulp.task('build:assets', gulp.parallel('styles', 'scripts'));

// server task - Run server
gulp.task('server', function() {
  browserSync.init({
    server: paths.siteDir,
    port: 3000,
    browser: "google chrome"
  });

  gulp.watch(paths.jekyllCongif, gulp.series('jekyll:watch'));          // Watch _config.yml
  gulp.watch(paths.jekyllPages, gulp.series('jekyll:watch'));           // Watch root pages
  gulp.watch(paths.jekyllIncludes, gulp.series('jekyll:watch'));        // Watch _includes
  gulp.watch(paths.jekyllLayouts, gulp.series('jekyll:watch'));         // Watch _layouts
  gulp.watch(paths.jekyllPosts, gulp.series('jekyll:watch'));           // Watch _posts
  gulp.watch(paths.stylusPattern, gulp.series('styles'));               // Watch styles
  gulp.watch(paths.scriptsPattern, gulp.series('scripts'));             // Watch scripts
  gulp.watch(paths.imgPattern, gulp.series('images', 'jekyll:watch'));  // Watch images
});

// build - Builds site anew.
gulp.task('build', gulp.series('clean:jekyll', 'build:assets', 'build:jekyll'));

// Develop Task
gulp.task('develop', gulp.series('build', 'server'));

// Develop Task
gulp.task('default', gulp.series('develop'));
