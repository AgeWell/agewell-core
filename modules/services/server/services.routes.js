'use strict';

/**
 * Module dependencies
 */
const servicesPolicy = require('./services.policy');
const services = require('./services.controller');

module.exports = function(app) {
  // Services Routes
  app.route('/api/services').all(servicesPolicy.isAllowed)
    .get(services.list)
    .post(services.create);

  app.route('/api/services/:serviceId').all(servicesPolicy.isAllowed)
    .get(services.read)
    .put(services.update)
    .delete(services.delete);

  // Finish by binding the Service middleware
  app.param('serviceId', services.serviceByID);
};
