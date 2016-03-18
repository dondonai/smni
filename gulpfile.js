var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var htmlreplace = require('gulp-html-replace');
var templateCache = require('gulp-angular-templatecache');
var shell = require('gulp-shell');

var paths = {
  sass: ['./scss/**/*.scss'],
  js: ['./scripts/**/*.js']
};

gulp.task('default', ['sass', 'build-js', 'process-img', 'watch', 'ionic-serve']);

gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['build-js']);
});

gulp.task('ionic-serve', shell.task('ionic serve --lab'));

gulp.task('ionic-build',
  shell.task('ionic build android --release'
));

gulp.task('build-js', function () {
  return gulp.src('./scripts/**/*.js')
    .pipe(ngAnnotate())
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    // .pipe(gulp.dest('dist/js/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('www/js/'));
});

gulp.task('sass', function (done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    // .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('process-img', () => {
    return gulp.src('images/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin({
            optimizationLevel: 4,
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('www/img'));
});

gulp.task('build-app', ['sass', 'build-js', 'process-img', 'ionic-build']);

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
