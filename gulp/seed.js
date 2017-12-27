const chalk = require('chalk');
const glob = require('glob');
const gulp = require('gulp');
const path = require('path');
const runSequence = require('run-sequence');

const defaultAssets = require('../config/assets/default');
const prodAssets = require('../config/assets/prod');

// Drops the MongoDB database, used in e2e testing
gulp.task('seedDB', function(done) {
  let mongoose = require('../config/lib/mongoose.js');

  mongoose.loadModels();

  // Globbing model files
  glob('modules/*/server/**/*.seed.js', (err, seeds) => {
    if (err) {
      return console.error(chalk.red(err));
    }
    let totalSeeds = seeds.length;
    let seeded = 0;

    mongoose.connect(function(db) {

      // Globbing model files
      seeds.forEach(function(seedPath) {
        require(path.resolve(seedPath)).seed(function() {
          seeded += 1;
          if (seeded === totalSeeds) {
            console.log('\n\nSeed Successfull!\n\n');
            db.connection.db.close();
            done();
          }
        });
      });
    });
  });
});

// Run the project seed for dev
gulp.task('seed', function(done) {
  runSequence('env:dev', 'dropdb', 'seedDB', done);
});

// Run the project seed
gulp.task('seed:prod', function(done) {
  runSequence('env:prod', 'dropdb', 'seedDB', done);
});
