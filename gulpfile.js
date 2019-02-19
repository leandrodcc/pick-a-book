const gulp = require('gulp')

// css
const cleanCss = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const concat = require('gulp-concat')
// js
const webpack = require('webpack-stream')
const babel = require('gulp-babel')
// browser refresh
const browserSync = require('browser-sync').create();
// img compression
const imagemin = require('gulp-imagemin')
// github
const ghpages = require('gh-pages')

gulp.task('js', function() {
    gulp.src('src/js/*')
        .pipe(
            webpack({
                mode: 'production', 
                devtool: 'source-map', 
                output: {
                    filename: 'app.js'
                }
            })
        )
        .pipe(
            babel({
                presets: ['@babel/env']
            })
        )
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream())
})

gulp.task('css', function() {
  return gulp.src([
      'src/css/reset.css',
      'src/css/typography.css',
      'src/css/books.css',
      'src/css/app.css'
  ])
    .pipe(sourcemaps.init())
    .pipe(
        postcss([
            require('autoprefixer')({
                grid: true
            }),
            require('postcss-preset-env')({ 
                stage: 1,
                browsers: ['IE 11', 'last 2 versions']
             })
        ])
    )
    .pipe(concat('app.css'))
    .pipe(
        cleanCss({ compatibility: 'ie8' })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
})

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
})

gulp.task('fonts', function() {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('images', function() {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
})

gulp.task('watch', function() {
    browserSync.init({ 
        server: {
            baseDir: 'dist'
        }
    })
    gulp.watch('src/*.html', ['html']).on('change', browserSync.reload)
    gulp.watch('src/css/*', ['css'])
    gulp.watch('src/js/*', ['js'])
    gulp.watch('src/fonts/*', ['fonts'])
    gulp.watch('src/img/*', ['images'])
})

gulp.task('deploy', function() {
    ghpages.publish('dist')
})

gulp.task('default', ['html', 'css', 'js', 'fonts', 'images', 'watch'])