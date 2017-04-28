const defaultAssets = require('../config/assets/default');
const prodAssets = require('../config/assets/production');
const gulp = require('gulp');
const runSequence = require('run-sequence');

// Drops the MongoDB database, used in e2e testing
gulp.task('seedDB', function(done) {
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

// Run the project seed for dev
gulp.task('seed', function(done) {
  runSequence('env:dev', ['makeUploadsDir', 'dropdb'], 'lint', 'seedDB', done);
});

// Run the project seed
gulp.task('seed:prod', function(done) {
  runSequence('env:prod', ['makeUploadsDir', 'dropdb'], 'seedDB', done);
});
