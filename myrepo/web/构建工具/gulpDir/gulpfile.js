const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const cssmin = require('gulp-cssmin');
const imagemin = require('gulp-imagemin');


// gulp 3.9.1版本这么写，4.0已经不能这么写了
gulp.task('js', () => {
    return gulp.src(['./src/js/**/*.js'])
    // 是否打包成一个文件，如果是，传入最后打包文件的名字
    //     .pipe(concat('bundle.min.js'))

    // 是否启用source map，和后面的sourcemaps.write()配合使用
        .pipe(sourcemaps.init())

        // 先用babel将高级语法转成低级，否则uglify会报错
        .pipe(babel({
            presets: ['@babel/env']
        }))

        // 压缩
        .pipe(uglify())
        .pipe(sourcemaps.write())

        // 将压缩后的名字重命名为xxx.min.js，否则将用原名
        .pipe(rename({suffix: '.min'}))

        // 压缩后文件存放的目录
        .pipe(gulp.dest('./build/js'))
});

gulp.task('style', () => {
    return gulp.src(['./src/css/**/*.css'])
        .pipe(concat('style.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('./build/css'))
});

gulp.task('image', () => {
    return gulp.src(['./src/img/**/*.jpg', './src/img/**/*.png', './src/img/**/*.gif'])
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({propressive: true}),
            imagemin.optipng({optimizationLevel: 5})
        ]))
        .pipe(gulp.dest('./build/img'))
});


gulp.task('default', ['js', 'style', 'image']);