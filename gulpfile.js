var gulp = require('gulp');
var path = require('path');

var del = require('del');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var less = require('gulp-less');
var mocha = require('gulp-mocha');

var through = require('through2');

var BUILD_DIR = '.build';

gulp.task('default', () => {
  // Fill out default task later ʕ´•ᴥ•`ʔ
});

// Build task
gulp.task('build', ['del', 'webpack', 'less']);

// Clean up the build directory
gulp.task('del', (done) => {
  return del([path.join(BUILD_DIR, '**')], function() {
    done();
  });
});

// Bundle the files
gulp.task('webpack', ['del'], (done) => {
  // Build with webpack. See webpack.config.js for build options
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw err;
    }
    console.log('WEBPACK', stats.toString({colors: true}));
    done();
  });
});

// Build the CSS files
gulp.task('less', ['del'], () => {
  gulp.src('public/css/**/*.less')
    .pipe(less())
    .pipe(gulp.dest(path.join(BUILD_DIR, 'css')));
});

// Copy over files from the public directory
gulp.task('copy', () => {
  gulp.src([
    // Include files
    'public/**/*',
    // Exclude files
    '!public/js/**/*.js',
    '!public/css/**/*',
    '!public/template/**/*'
  ]).pipe(gulp.dest(BUILD_DIR));
});

// Run the unit tests
gulp.task('test', () => {
  return gulp.src(['tests/**/*Spec.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec'
    }));
});

// An example of what the an html compile step might look like?
gulp.task('html', () => {
  // This is not really needed, just a test to see what a plugin is like
  gulp.src('public/templates/**/*.ejs', {buffer: false})
    .pipe(function() {
      return through.obj((file, enc, cb) => {
        console.log('pipe through', file.isStream(), file.isBuffer());
        console.log('file: ', file, 'enc: ', enc, 'cb: ', cb);
        file.contents.on('data', function(chunk) {
          console.log('chunk\n', chunk.toString());
        })
        file.contents.on('end', function() {
          console.log('end');
          cb();
        })
      });
    }())
});
