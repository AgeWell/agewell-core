// Sort this function for running in production.
const fs = require('fs');
const _ = require('lodash');
const defaultAssets = require('../config/assets/default');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins({
  rename: {
    'gulp-angular-templatecache': 'templateCache'
  }
});
const del = require('del');


// JS minifying task
gulp.task('uglify', function() {
  var assets = _.union(
    defaultAssets.client.js,
    defaultAssets.client.templates
  );
  del(['public/dist/*']);

  return gulp.src(assets)
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.uglify({
      mangle: false
    }))
    .pipe(plugins.concat('application.min.js'))
    .pipe(plugins.rev())
    .pipe(gulp.dest('public/dist'));
});
