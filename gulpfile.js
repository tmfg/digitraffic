"use strict";

const gulp = require('gulp');
const cp = require('child_process');
const browsersync = require('browser-sync').create();
const { src, dest } = require('gulp');
const clean = require('gulp-clean');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./_site/"
        },
        port: 3000,
        open: false
    });
    done();
}

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Jekyll
function jekyll() {
    browsersync.notify(messages.jekyllBuild);
    return cp.spawn("bundle", ["exec", "jekyll", "build", '--config', '_config_dev.yml', '-d', '_site_tmp'], { stdio: "inherit" });
}

// Copy generated content to _site folder where it is served
function updateSite() {
    return src('_site_tmp/**/*', { buffer: false , allowEmpty: true }).pipe(dest('_site'));
}

// Clean tmp folder for generated site
function cleanTmp() {
    return src('_site_tmp/*', { read: false, allowEmpty: true}).pipe(clean());
}

// Clean _site folder for old data
function cleanTgt() {
    return src('_site/*', {read: false, allowEmpty: true}).pipe(clean());
}

// Watch files
function watchFiles() {
    gulp.watch(
        [
            '*.html',
            '_applications/*',
            '_config*.yml',
            './**/_developments/*',
            '_includes/*',
            '_layouts/*',
            '_posts/*',
            '_scss/*',
            'css/*',
            'data/*',
            'favicon/*',
            'img/**/*',
            'js/*',
            'pages/*'
        ],
        gulp.series(cleanTmp, jekyll, cleanTgt, updateSite, browserSyncReload)
    );
}
// jekyll here to generate also on startup
gulp.task('default', gulp.series(cleanTmp, jekyll, cleanTgt, updateSite, browserSync, watchFiles, function() {
    // default task code here
}));