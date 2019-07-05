const gulp = require('gulp');
const uglify = require('gulp-uglify');


gulp.task('js', ()=>{
    return gulp.src(['./src/js/*.js']).pipe(uglify()).pipe(gulp.dest('./build/js'))
});


gulp.task('default', ['js']);