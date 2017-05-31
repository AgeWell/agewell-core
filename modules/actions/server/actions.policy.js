'use strict';

/**
 * Module dependencies
 */
let acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Actions to gos Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/actions',
      permissions: '*'
    }, {
      resources: '/api/actions/:actionId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/actions',
      permissions: ['get', 'post']
    }, {
      resources: '/api/actions/:actionId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/actions',
      permissions: ['get']
    }, {
      resources: '/api/actions/:actionId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Actions to gos Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  let roles = (req.user) ? req.user.roles : ['guest'];

  // If an Actions to go is being processed and the current user created it then allow any manipulation
  if (req.actionsToGo && req.user && req.actionsToGo.user && req.actionsToGo.user.id === req.user.id) {
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
