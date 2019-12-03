"use strict";

const gulp = require('gulp');
const cp = require('child_process');
const browsersync = require('browser-sync').create();
const del = require('del');

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
    return cp.spawn("bundle", ["exec", "jekyll", "build", '--config', '_config_dev.yml'], { stdio: "inherit" });
}

// Clean output dir
function clean() {
    return del('_site/**', {force:true});
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
        gulp.series(clean, jekyll, browserSyncReload)
    );
}
// jekyll here to generate also on startup
gulp.task('default', gulp.series(clean, jekyll, browserSync, watchFiles, function() {
    // default task code here
}));