'use strict';

/**
 * Module dependencies
 */
const ordersPolicy = require('./orders.policy');
const orders = require('./orders.controller');

module.exports = function(app) {
  // Groceries to gos Routes
  app.route('/api/orders').all(ordersPolicy.isAllowed)
    .get(orders.list)
    .post(orders.create);

  app.route('/api/orders/:orderId').all(ordersPolicy.isAllowed)
    .get(orders.read)
    .put(orders.update)
    .delete(orders.delete);

  app.route('/api/orders/:orderId/items/:itemId/cart').all(ordersPolicy.isAllowed)
    .get(orders.itemToggleCart);

  // Finish by binding the Groceries to go middleware
  app.param('orderId', orders.orderByID);
};
