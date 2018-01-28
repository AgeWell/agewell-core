'use strict';

/**
 * Module dependencies
 */
const ridesPolicy = require('./rides.policy');
const rides = require('./rides.controller');

module.exports = function(app) {
  // Rides Routes
  app.route('/api/rides').all(ridesPolicy.isAllowed)
    .get(rides.list)
    .post(rides.create);
};
