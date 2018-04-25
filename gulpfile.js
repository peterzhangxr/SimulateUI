/**
 * Created by peterzhang on 2018/4/18.
 */
var path = require('path');
var gulp = require('gulp')
var less = require('gulp-less');
var header = require('gulp-header');
var nano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var comments = require('postcss-discard-comments');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var pkg = require('./package.json');

var option = {base: 'src/less'};
var dist = __dirname + '/dist/style';
var banner = [
    '/*!',
    ' * SimulateUI v<%= pkg.version %> (<%= pkg.homepage %>)',
    ' * Copyright <%= new Date().getFullYear() %> PeterZhangInc.',
    ' * Licensed under the <%= pkg.license %> license',
    ' */',
    ''
].join('\n');
gulp.task('default', function () {

    gulp.src('src/less/simulate.less', option)
        .pipe(sourcemaps.init())
        .pipe(
            less().on('error', function (e) {
                console.log(e.message);
                this.emit('end');
            })
        )
        .pipe(postcss([autoprefixer(['iOS >= 9', 'Android >= 6']), comments()]))
        .pipe(header(banner, { pkg: pkg }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({ stream: true }))
        .pipe(
            nano({
                zindex: false,
                autoprefixer: false
            })
        )
        .pipe(
            rename(function(path) {
                path.basename += '.min';
            })
        )
        .pipe(gulp.dest(dist));
});
