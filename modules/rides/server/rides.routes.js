'use strict';

/**
 * Module dependencies
 */
const ridesPolicy = require('./rides.policy');
const rides = require('./rides.controller');

module.exports = function(app) {
  // Rides Routes
  app
    .route('/api/rides')
    .all(ridesPolicy.isAllowed)
    .get(rides.list)
    .post(rides.create);

  app
    .route('/api/rides/:rideId')
    .all(ridesPolicy.isAllowed)
    .get(rides.read)
    .put(rides.update)
    .delete(rides.delete);

  // Finish by binding the Rides middleware
  app.param('rideId', rides.rideByID);
};
