'use strict';

/**
 * Module dependencies.
 */
const config = require('../config');
const chalk = require('chalk');
const path = require('path');
const mongoose = require('mongoose');

// Load the mongoose models
module.exports.loadModels = function(callback) {
  // console.log(config.files);
  // Globbing model files
  config.files.server.models.forEach(function(modelPath) {
    require(path.resolve(modelPath));
  });

  if (callback) callback();
};

// Initialize Mongoose
module.exports.connect = function(cb) {
  var _this = this;

  mongoose.Promise = config.db.promise;

  var db = mongoose.connect(config.db.uri, config.db.options, function(err) {
    // Log Error
    if (err) {
      console.error(chalk.red('Could not connect to MongoDB!'));
      return console.log(err);
    }

    // Enabling mongoose debug mode if required
    mongoose.set('debug', config.db.debug);

    // Call callback FN
    if (cb) cb(db);
  });
};

module.exports.disconnect = function(cb) {
  mongoose.disconnect(function(err) {
    console.info(chalk.yellow('Disconnected from MongoDB.'));
    cb(err);
  });
};
