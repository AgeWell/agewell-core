let _ = require('lodash'),
  fs = require('fs'),
  defaultAssets = require('../config/assets/default'),
  gulp = require('gulp'),
  csslint = require('gulp-csslint'),
  eslint = require('gulp-eslint');

// CSS linting task
gulp.task('csslint', function() {
  return gulp.src(defaultAssets.client.css)
    .pipe(csslint('.csslintrc'))
    .pipe(csslint.formatter());
  // Don't fail CSS issues yet
  // .pipe(plugins.csslint.failFormatter());
});

// ESLint JS linting task
gulp.task('eslint', function() {
  var assets = _.union(
    defaultAssets.server.gulpConfig,
    defaultAssets.server.allJS,
    defaultAssets.client.js
  );

  return gulp.src(assets)
    .pipe(eslint())
    .pipe(eslint.format());
});
