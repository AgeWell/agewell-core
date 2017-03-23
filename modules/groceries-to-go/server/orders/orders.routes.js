'use strict';

/**
 * Module dependencies
 */
const groceriesToGosPolicy = require('../groceries-to-go.policy');
const groceriesToGos = require('./grocery.controller');

module.exports = function(app) {
  // Groceries to gos Routes
  app.route('/api/groceries').all(groceriesToGosPolicy.isAllowed)
    .get(groceriesToGos.list)
    .post(groceriesToGos.create);

  app.route('/api/groceries/:groceryId').all(groceriesToGosPolicy.isAllowed)
    .get(groceriesToGos.read)
    .put(groceriesToGos.update)
    .delete(groceriesToGos.delete);

  // Finish by binding the Groceries to go middleware
  app.param('groceryId', groceriesToGos.groceriesToGoByID);
};
