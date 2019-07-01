"use strict";

const gulp = require('gulp');
const cp = require('child_process');
const browsersync = require('browser-sync').create();

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
            'css/*',
            'data/*',
            'favicon/*',
            'img/**/*',
            'js/*',
            'pages/*'
        ],
        gulp.series(jekyll, browserSyncReload)
    );
}

gulp.task('default', gulp.series(browserSync, watchFiles, function() {
    // default task code here
}));