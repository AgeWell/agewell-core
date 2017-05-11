'use strict';

/**
 * Module dependencies
 */
const groceriesPolicy = require('./groceries.policy');
const groceries = require('./groceries.controller');

module.exports = function(app) {
  // Groceries to gos Routes
  app.route('/api/groceries').all(groceriesPolicy.isAllowed)
    .get(groceries.list)
    .post(groceries.create);

  // app.route('/api/groceries/:orderId').all(groceriesPolicy.isAllowed)
  //   .get(groceries.read)
  //   .put(groceries.update)
  //   .delete(groceries.delete);

  // Finish by binding the Groceries to go middleware
  // app.param('orderId', groceries.orderByID);
};
