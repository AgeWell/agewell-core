'use strict';

/**
 * Module dependencies
 */
const groceriesToGosPolicy = require('../groceries-to-go.policy');
const orders = require('./orders.controller');

module.exports = function(app) {
  // Groceries to gos Routes
  app.route('/api/orders').all(groceriesToGosPolicy.isAllowed)
    .get(orders.list)
    .post(orders.create);

  app.route('/api/orders/:orderId').all(groceriesToGosPolicy.isAllowed)
    .get(orders.read)
    .put(orders.update)
    .delete(orders.delete);

  // Finish by binding the Groceries to go middleware
  app.param('orderId', orders.ordersByID);
};
