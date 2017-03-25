'use strict';

/**
 * Module dependencies
 */
let acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Groceries to gos Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/groceries',
      permissions: '*'
    }, {
      resources: '/api/groceries/:groceriesToGoId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/groceries',
      permissions: ['get', 'post']
    }, {
      resources: '/api/groceries/:groceriesToGoId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/groceries',
      permissions: ['get']
    }, {
      resources: '/api/groceries/:groceriesToGoId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Groceries to gos Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  let roles = (req.user) ? req.user.roles : ['guest'];

  // If an Groceries to go is being processed and the current user created it then allow any manipulation
  if (req.groceriesToGo && req.user && req.groceriesToGo.user && req.groceriesToGo.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    }

    if (isAllowed) {
      // Access granted! Invoke next middleware
      return next();
    }

    return res.status(403).json({
      message: 'User is not authorized'
    });
  });
};
