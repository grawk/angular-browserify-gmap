var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean');

// JSHint task
gulp.task('lint', function () {
    gulp.src('./app/scripts/*.js')
        .pipe(jshint())
        // You can look into pretty reporters as well, but that's another story
        .pipe(jshint.reporter('default'));
});
gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});
// Browserify task
gulp.task('browserify', function () {
    // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
    gulp.src(['app/scripts/main.js'])
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        // Bundle to a single file
        .pipe(concat('bundle.js'))
        // Output it to our dist folder
        .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['lint', 'browserify', 'styles', 'views']);

gulp.task('views', function () {
    return gulp.src('app/**/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('dist/'));
});


// Not necessary, but I like this one, it automatically adds prefixes for all browsers


// Styles task
gulp.task('styles', function () {
    gulp.src('app/styles/*.scss')
        // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
        .pipe(sass({
            onError: function (e) {
                console.log(e);
            }
        }))
        // Optionally add autoprefixer
        .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
        // These last two should look familiar now :)
        .pipe(gulp.dest('dist/css/'))
    //.pipe(refresh(lrserver));
});

gulp.task('watch', ['lint'], function () {
    //Watch our scripts
    gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'], [
        'lint',
        'browserify'
    ]);
});

gulp.watch(['app/views/**/*.jade'], [
    'views'
]);

gulp.watch(['app/styles/**/*.scss'], [
    'styles'
]);

gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'], [
    'lint',
    'browserify'
]);