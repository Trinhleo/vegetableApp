var gulp = require('gulp'),
    connect = require('gulp-connect'),
    bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    less = require('gulp-less'),
    path = require('path'),
    angularFilesort = require('gulp-angular-filesort');


gulp.task('connect', function () {
    connect.server({
        root: '.',
        port: 8080,
        livereload: true
    });
});

gulp.task('index', function () {
    var target = gulp.src('./index.html'),
        srcBower = gulp.src(bowerFiles(), {read: false}),
        srcCss = gulp.src(['./app/**/*.css'], {read: false}),
        srcAngular = gulp.src(['./app/**/*.js']).pipe(angularFilesort());
        

    return target.pipe(inject(srcBower, {name: 'bower', relative: true}))
        .pipe(inject(srcCss, {relative: true}))
        .pipe(inject(srcAngular, {relative: true}))
        .pipe(gulp.dest('.'))
});

gulp.task('less', function () {
    return gulp.src('./app/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./app'))
});

gulp.task('watch', function () {
    gulp.watch('./app/**/*.less', ['less', 'index']);
});

gulp.task('default', ['connect']);