'use strict';

/**
 * Module dependencies
 */
const volunteersPolicy = require('./volunteers.policy');
const volunteers = require('./volunteers.controller');

module.exports = function(app) {
  // Volunteers Routes
  app.route('/api/volunteers').all(volunteersPolicy.isAllowed)
    .get(volunteers.list)
    .post(volunteers.create);

  app.route('/api/volunteers/:volunteerId').all(volunteersPolicy.isAllowed)
    .get(volunteers.read)
    .put(volunteers.update)
    .delete(volunteers.delete);

  // Finish by binding the Volunteer middleware
  app.param('volunteerId', volunteers.volunteerByID);
};
