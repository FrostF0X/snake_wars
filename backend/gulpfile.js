const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('build', () =>
    gulp.src('src/**')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('watch', () =>
    gulp.watch('app/**', ['build'])
);

gulp.task('default', ['watch']);
