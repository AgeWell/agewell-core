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
};
