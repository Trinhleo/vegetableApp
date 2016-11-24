var gulp = require('gulp'),
    connect = require('gulp-connect'),
    bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    less = require('gulp-less'),
    path = require('path'),
    angularFilesort = require('gulp-angular-filesort');
var rename = require('gulp-rename');
var wiredep = require('wiredep').stream;


gulp.task('connect', function () {
    connect.server({
        root: '.',
        port: 8080,
        livereload: true
    });
});

gulp.task('inject', function () {
    gulp.src('./index.template.html')
        .pipe(inject(gulp.src(['./app/**/*.js', './app/**/**/*.js', './app/**/**/**/*.js', './app/**/*.css', './app/**/**/*.css', './app/**/**/**/*.css'], {
            read: false
        }), {
                relative: true
            }))
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here'
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('.'));

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