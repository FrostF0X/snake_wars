const gulp = require('gulp');
const ts = require('gulp-typescript').createProject('tsconfig.json');

gulp.task('default', ['watch-ts']);

gulp.task('build-ts', () =>
    gulp.src('app-typescript/**')
        .pipe(ts())
        .pipe(gulp.dest('dist'))
);

gulp.task('watch-ts', () =>
    gulp.watch('app-typescript/**', ['build'])
);
