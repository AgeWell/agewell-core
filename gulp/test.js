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
  // var testSuites = changedTestFiles.length ? changedTestFiles : testAssets.tests.server;
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
        console.error(err);

        // If an error occurs, save it
        error = err;
      })
      .on('end', function() {
        // When the tests are done, disconnect mongoose and pass the error state back to gulp
        mongoose.disconnect(function() {
          done(error);
          process.exit();
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
  var testSuites = changedTestFiles.length ? changedTestFiles : testAssets.tests.server;

  return gulp.src(testSuites)
    .pipe(plugins.istanbul.writeReports({
      reportOpts: {
        dir: '../coverage/server'
      }
    }));
});

// // Karma test runner task
// gulp.task('karma', function (done) {
//   new KarmaServer({
//     configFile: path.join(__dirname, '/karma.conf.js')
//   }, done).start();
// });
//
// // Run karma with coverage options set and write report
// gulp.task('karma:coverage', function(done) {
//   new KarmaServer({
//     configFile: path.join(__dirname, '/karma.conf.js'),
//     preprocessors: {
//       'modules/*/client/views/**/*.html': ['ng-html2js'],
//       'modules/core/client/app/config.js': ['coverage'],
//       'modules/core/client/app/init.js': ['coverage'],
//       'modules/*/client/*.js': ['coverage'],
//       'modules/*/client/config/*.js': ['coverage'],
//       'modules/*/client/controllers/*.js': ['coverage'],
//       'modules/*/client/directives/*.js': ['coverage'],
//       'modules/*/client/services/*.js': ['coverage']
//     },
//     reporters: ['progress', 'coverage'],
//     coverageReporter: {
//       dir: 'coverage/client',
//       reporters: [
//         { type: 'lcov', subdir: '.' }
//         // printing summary to console currently weirdly causes gulp to hang so disabled for now
//         // https://github.com/karma-runner/karma-coverage/issues/209
//         // { type: 'text-summary' }
//       ]
//     }
//   }, done).start();
// });

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

// Downloads the selenium webdriver
// gulp.task('webdriver_update', webdriver_update);

// Start the standalone selenium server
// NOTE: This is not needed if you reference the
// seleniumServerJar in your protractor.conf.js
// gulp.task('webdriver_standalone', webdriver_standalone);

// Protractor test runner task
// gulp.task('protractor', ['webdriver_update'], function () {
//   gulp.src([])
//     .pipe(protractor({
//       configFile: 'protractor.conf.js'
//     }))
//     .on('end', function() {
//       console.log('E2E Testing complete');
//       // exit with success.
//       process.exit(0);
//     })
//     .on('error', function(err) {
//       console.error('E2E Tests failed:');
//       console.error(err);
//       process.exit(1);
//     });
// });


// Run the project tests
gulp.task('test', function(done) {
  runSequence(
    'env:test',
    'test:server',
    // 'karma',
    // 'nodemon',
    // 'protractor',
    done
  );
});

gulp.task('test:server', function(done) {
  runSequence('env:test', ['makeUploadsDir', 'dropdb'], 'lint', 'mocha', done);
});

// Watch all server files for changes & run server tests (test:server) task on changes
// gulp.task('test:server:watch', function (done) {
//   runSequence('test:server', 'watch:server:run-tests', done);
// });

// gulp.task('test:client', function (done) {
//   runSequence('env:test', 'lint', 'dropdb', 'karma', done);
// });

// gulp.task('test:e2e', function (done) {
//   runSequence('env:test', 'lint', 'dropdb', 'nodemon', 'protractor', done);
// });

gulp.task('test:coverage', function(done) {
  runSequence('env:test', ['copyLocalEnvConfig', 'makeUploadsDir', 'dropdb'], 'lint', 'mocha:coverage', done);
});
