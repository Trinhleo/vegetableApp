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
        .pipe(inject(gulp.src(['./app/**/*.css', './app/**/**/*.css', './app/**/**/**/*.css','./app/app.module.js','./app/app.config.js','./app/app.router.js','./app/components/**/*.module.js','./app/components/**/*.controller.js','./app/components/**/*.router.js','./app/components/**/**/*.module.js','./app/components/**/**/*.controller.js','./app/components/**/**/*.router.js','./app/shared/**/*.module.js','./app/shared/**/*.service.js','./app/shared/**/*.directive.js','./app/shared/**/**/*.directive.js'], {
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

gulp.task('default', ['inject','connect']);