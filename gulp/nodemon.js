const _ = require('lodash');
const fs = require('fs');
const defaultAssets = require('../config/assets/default');
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

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
