const fs = require('fs');
const path = require('path');
const defaultAssets = require('../config/assets/default');
const testAssets = require('../config/assets/test');
const testConfig = require('../config/env/test');
const gulp = require('gulp');
const refresh = require('gulp-refresh');
const gulpLoadPlugins = require('gulp-load-plugins');
const runSequence = require('run-sequence');
const plugins = gulpLoadPlugins({
  rename: {
    'gulp-angular-templatecache': 'templateCache'
  }
});
const protractor = require('gulp-protractor').protractor;
// const webdriver_update = require('gulp-protractor').webdriver_update;
// const webdriver_standalone = require('gulp-protractor').webdriver_standalone;
const del = require('del');
// const KarmaServer = require('karma').Server;

// Local settings
var changedTestFiles = [];

// Mocha tests task
gulp.task('mocha', function(done) {
  // Open mongoose connections
  var mongoose = require('../config/lib/mongoose.js');
  var testSuites = testAssets.tests.server;
  var error;

  // Connect mongoose
  mongoose.connect(function() {
    mongoose.loadModels();

    // Run the tests
    gulp.src(testSuites)
      .pipe(plugins.mocha({
        reporter: 'spec',
        timeout: 10000
      }))
      .on('error', function(err) {

        // If an error occurs, save it
        error = err;
      })
      .on('end', function() {
        // When the tests are done, disconnect mongoose and pass the error state back to gulp
        mongoose.disconnect(function() {
          done(error);
        });
      });
  });
});

// Prepare istanbul coverage test
gulp.task('pre-test', function() {

  // Display coverage for all server JavaScript files
  return gulp.src(defaultAssets.server.allJS)
    // Covering files
    .pipe(plugins.istanbul())
    // Force `require` to return covered files
    .pipe(plugins.istanbul.hookRequire());
});

// Run istanbul test and write report
gulp.task('mocha:coverage', ['pre-test', 'mocha'], function() {
  var testSuites = testAssets.tests.server;

  return gulp.src(testSuites)
    .pipe(plugins.istanbul.writeReports({
      reportOpts: {
        dir: './coverage/server'
      }
    }));
});

// Make sure upload directory exists
gulp.task('makeUploadsDir', function() {
  return fs.mkdir('public/uploads', function(err) {
    if (err && err.code !== 'EEXIST') {
      console.error(err);
    }
  });
});

// Drops the MongoDB database, used in e2e testing
gulp.task('dropdb', function(done) {
  // Use mongoose configuration
  var mongoose = require('../config/lib/mongoose.js');

  mongoose.connect(function(db) {
    db.connection.db.dropDatabase(function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log('Successfully dropped db: ', db.connection.db.databaseName);
      }
      db.connection.db.close(done);
    });
  });
});

// Run the project tests
gulp.task('test', function(done) {
  runSequence('env:test', ['makeUploadsDir', 'dropdb'], 'lint', 'mocha', done);
});

gulp.task('test:coverage', function(done) {
  runSequence('env:test', ['makeUploadsDir', 'dropdb'], 'lint', 'mocha:coverage', done);
});
