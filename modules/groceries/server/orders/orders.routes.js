'use strict';

/**
 * Module dependencies
 */
const path = require('path');
const ordersPolicy = require('./orders.policy');
const orders = require('./orders.controller');
const upload = require(path.resolve('./config/lib/multer.js'));

module.exports = function(app) {
  // Groceries to gos Routes
  app.route('/api/orders').all(ordersPolicy.isAllowed)
    .get(orders.list)
    .post(orders.create);

  // app.route('/api/orders/reciept')
  //   .post(upload.upload.single('reciept'), orders.reciept);

  app.route('/api/orders/:orderId').all(ordersPolicy.isAllowed)
    .get(orders.read)
    .put(orders.update)
    .delete(orders.delete);

  app.route('/api/orders/:orderId/reciept')
    .post(upload.upload.single('reciept'), orders.reciept);

  // Finish by binding the Groceries to go middleware
  app.param('orderId', orders.orderByID);
};
