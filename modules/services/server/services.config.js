'use strict';

/**
 * Module dependencies
 */
const path = require('path');
const mongoose = require('mongoose');
const Service = mongoose.model('Service');
const config = require(path.resolve('./config/config'));

/**
 * Services module init function.
 */
module.exports = function (app, db) {
  app.use(function (req, res, next) {
    getServices().then(function(results) {
      req.options.Service = {
        services: results
      };
      next();
    });
  });
};

// loads all services into an options variable.
function getServices() {
  return Service.find({})
    .select({
      'title': 1,
      '_id': 1,
      'for': 1
    })
    .exec(function(err, services) {
      if (err) {
        console.error(err);
      }

      return services;
    });
}
