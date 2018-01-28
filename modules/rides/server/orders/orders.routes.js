'use strict';

/**
 * Module dependencies
 */
const path = require('path');
const ordersPolicy = require('./orders.policy');
const orders = require('./orders.controller');
const upload = require(path.resolve('./config/lib/multer.js'));

module.exports = function(app) {
  // Rides Routes
  app.route('/api/orders').all(ordersPolicy.isAllowed)
    .get(orders.list)
    .post(orders.create);

  app.route('/api/orders/:orderId').all(ordersPolicy.isAllowed)
    .get(orders.read)
    .put(orders.update)
    .delete(orders.delete);

  // Finish by binding the Rides middleware
  app.param('orderId', orders.orderByID);
};
