'use strict';

/**
 * Module dependencies
 */
const actionsPolicy = require('./actions.policy');
const actions = require('./actions.controller');

module.exports = function(app) {
  // Actions to gos Routes
  app.route('/api/actions').all(actionsPolicy.isAllowed)
    .get(actions.list)
    .post(actions.create);

  app.route('/api/actions/:actionId').all(actionsPolicy.isAllowed)
    .get(actions.read)
    .put(actions.update)
    .delete(actions.delete);

  // Finish by binding the Actions to go middleware
  app.param('actionId', actions.actionByID);
};
