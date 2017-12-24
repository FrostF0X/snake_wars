const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript').createProject('tsconfig.json');


gulp.task('build', () =>
    gulp.src('app/**')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('watch', () =>
    gulp.watch('app/**', ['build'])
);

gulp.task('default', ['watch']);


gulp.task('build-ts', () =>
    gulp.src('app-typescript/**')
        .pipe(ts())
        .pipe(gulp.dest('dist'))
);

gulp.task('watch-ts', () =>
    gulp.watch('app-typescript/**', ['build'])
);