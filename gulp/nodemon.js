let _ = require('lodash'),
  fs = require('fs'),
  defaultAssets = require('../config/assets/default'),
  gulp = require('gulp'),
  nodemon = require('gulp-nodemon');

// Nodemon task
gulp.task('nodemon', function() {
  return nodemon({
    script: 'server.js',
    nodeArgs: ['--debug'],
    ext: 'js,html',
    verbose: true,
    watch: _.union(defaultAssets.server.views, defaultAssets.server.allJS, defaultAssets.server.config)
  });
});

// Nodemon task without verbosity or debugging
gulp.task('nodemon-nodebug', function() {
  return nodemon({
    script: 'server.js',
    ext: 'js,html',
    watch: _.union(defaultAssets.server.views, defaultAssets.server.allJS, defaultAssets.server.config)
  });
});
