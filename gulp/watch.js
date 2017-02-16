var fs = require('fs'),
  defaultAssets = require('../config/assets/default'),
  gulp = require('gulp'),
  refresh = require('gulp-refresh');

// Watch Files For Changes
gulp.task('watch', function() {
  // Start livereload
  refresh.listen();

  // Add watch rules
  gulp.watch(defaultAssets.server.views).on('change', refresh.changed);
  gulp.watch(defaultAssets.server.allJS, ['eslint']).on('change', refresh.changed);
  gulp.watch(defaultAssets.client.js, ['eslint']).on('change', refresh.changed);
  gulp.watch(defaultAssets.client.css, ['csslint']).on('change', refresh.changed);
  gulp.watch(defaultAssets.client.sass, ['sass', 'csslint']).on('change', refresh.changed);

  if (process.env.NODE_ENV === 'production') {
    gulp.watch(defaultAssets.server.gulpConfig, ['templatecache', 'eslint']);
    gulp.watch(defaultAssets.client.views, ['templatecache']).on('change', refresh.changed);
  } else {
    gulp.watch(defaultAssets.server.gulpConfig, ['eslint']);
    gulp.watch(defaultAssets.client.views).on('change', refresh.changed);
  }
});
