var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var bulkSass = require('gulp-sass-bulk-import');
var image = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var run = require('run-sequence');
var rigger = require('gulp-rigger');
var mqpacker = require('css-mqpacker');
var postcss = require("gulp-postcss");
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var cache = require('gulp-cache')


gulp.task('html', function () {
    gulp.src('app/*.html') //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest('build')) //Выгружаем результат в папку build
        .pipe(browserSync.reload({
            stream: true
        })) //И перезагрузим наш сервер для обновлений
});


gulp.task('sass', function () { // Создаем таск "sass"
    return gulp.src('app/sass/**/*.scss') // Берем источник
        .pipe(bulkSass()).pipe(sass().on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
    .pipe(autoprefixer(['last 4 versions'], { cascade: true }))
//        .pipe(postcss([autoprefixer, mqpacker]))
        //     .pipe(postcss([autoprefixer({
        //            browsers: ['last 2 versions'],
        //            cascade: false
        //        }), 
        //                    mqpacker({sort: true})
        //    ]))
        .pipe(gulp.dest('build/css')) // Выгружаем результат в папку build/css
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({
            suffix: '.min'
        })) // Добавляем суффикс .min
        .pipe(gulp.dest('build/css')) // Выгружаем результата в папку build/css
        .pipe(browserSync.reload({
            stream: true
        })) // Обновляем CSS на странице при изменении
});


gulp.task('image', function () {
    return gulp.src('app/img/**/*')
        .pipe(image([
    image.gifsicle({
            interlaced: true
        })
    , 
        image.jpegtran({
            progressive: true
        })
    , 
        image.optipng({
            optimizationLevel: 3
        })
]))
        .pipe(gulp.dest('build/img'))
        .pipe(browserSync.reload({
        stream: true
    }))
});


gulp.task('fonts', function () {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('build/fonts'))
});


gulp.task('scripts', function () {
    return gulp.src('app/js/**/*') //при необходимости указываем нужные файлы библиотек
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('symbols', function () {
    return gulp.src('app/icons/*.svg')
        .pipe(svgmin())
        .pipe(svgstore({
        inlineSvg: true
    }))
        .pipe(rename('sprite.svg'))
        .pipe(gulp.dest('build/img'))
       .pipe(browserSync.reload({
        stream: true
    }))
});


gulp.task('clean', function () {
    return del('build/**/*')
});


gulp.task('build', function (fn) {
    run('clean', 'html', 'sass', 'scripts', 'symbols', 'fonts', 'image', fn)
});


gulp.task('browser-sync', function () { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'build' // Директория для сервера - build
        }
        , notify: false // Отключаем уведомления
    });
});


gulp.task('watch', ['browser-sync'],  function () {
    gulp.watch('app/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/**/*.html', ['html']); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', ['scripts']); // Наблюдение за JS файлами в папке js
    gulp.watch('app/img/**/*', ['image']);
    gulp.watch('app/icons/**/*', ['symbols'])
});


gulp.task('default', function () {
    run('build', ['browser-sync', 'watch'])
});