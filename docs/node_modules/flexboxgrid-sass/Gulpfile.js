/*global -$ */
'use strict';
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    jade = require('jade'),
    gulpJade = require('gulp-jade');

jade.filters.code = function( block ) {
    return block
        .replace( /&/g, '&amp;' )
        .replace( /</g, '&lt;' )
        .replace( />/g, '&gt;' )
        .replace( /"/g, '&quot;' );
};

gulp.task('jade:demo', function () {
  return gulp.src('./demo/*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('./demo/'));
});

gulp.task('styles:demo', function () {
  return gulp.src('demo/sass/*')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.', 'bower_components'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('demo'));
});

gulp.task('styles:dist', function () {
  return gulp.src('*.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.', 'bower_components'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['dist']));

gulp.task('watch', ['jade:demo', 'styles:demo', 'styles:dist'], function () {
  // watch for changes
  gulp.watch('demo/*.jade', ['jade:demo']);
  gulp.watch('*.scss', ['styles:dist']);
  gulp.watch('bower_components/**/*.scss', ['styles:dist']);
  gulp.watch('demo/sass/*.scss', ['styles:demo']);
  gulp.watch('bower.json', ['wiredep']);
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('src/sass/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', function () {
  gulp.start('watch');
});
