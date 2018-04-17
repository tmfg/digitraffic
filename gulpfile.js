const gulp = require('gulp');
const shell = require('gulp-shell');
const child = require('child_process');
const gutil = require('gulp-util');
const browserSync = require('browser-sync').create();

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return child.spawn( 'bundle', ['exec', 'jekyll', 'build', '--config',
        '_config_dev.yml'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync.init({server: {baseDir: '_site'}});
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch([
        '*.html',
        '_applications/*',
        '_config*.yml',
        '_developments/*',
        '_includes/*',
        '_layouts/*',
        '_posts/*',
        'css/*',
        'data/*',
        'favicon/*',
        'img/**/*',
        'js/*',
        'pages/*'
    ], ['jekyll-rebuild']);
});

gulp.task('default', ['browser-sync', 'watch']);