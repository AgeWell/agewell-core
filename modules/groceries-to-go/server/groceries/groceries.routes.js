'use strict';

/**
 * Module dependencies
 */
const groceriesToGosPolicy = require('../groceries-to-go.policy');
const groceries = require('./groceries.controller');

module.exports = function(app) {
  // Groceries to gos Routes
  app.route('/api/groceries').all(groceriesToGosPolicy.isAllowed)
    .get(groceries.list)
    .post(groceries.create);

  app.route('/api/groceries/:groceryId').all(groceriesToGosPolicy.isAllowed)
    .get(groceries.read)
    .put(groceries.update)
    .delete(groceries.delete);

  // Finish by binding the Groceries to go middleware
  app.param('groceryId', groceries.groceryByID);
};
