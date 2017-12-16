const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('script', () =>
    gulp.src('app/**')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('default', () =>
    gulp.watch('app/**', ['script'])
);