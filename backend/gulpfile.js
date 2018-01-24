const gulp = require('gulp');
const ts = require('gulp-typescript').createProject('tsconfig.json');

gulp.task('default', ['watch']);

gulp.task('build', () =>
    gulp.src('app/**')
        .pipe(ts())
        .pipe(gulp.dest('dist'))
);

gulp.task('watch', () =>
    gulp.watch('app/**', ['build'])
);
