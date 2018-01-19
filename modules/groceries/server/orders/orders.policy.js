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
      resources: '/api/orders',
      permissions: '*'
    }, {
      resources: '/api/orders/:orderId',
      permissions: '*'
    }, {
      resources: '/api/orders/:orderId/reciept',
      permissions: ['get', 'post', 'put']
    }]
  }, {
    roles: ['volunteer'],
    allows: [{
      resources: '/api/orders',
      permissions: ['get']
    }, {
      resources: '/api/orders/:orderId',
      permissions: ['get', 'post', 'put']
    }, {
      resources: '/api/orders/:orderId/reciept',
      permissions: ['get', 'post', 'put']
    }]
  }]);
};

/**
 * Check If Groceries to gos Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  let roles = (req.user) ? req.user.roles : ['guest'];

  // If an Groceries to go is being processed and the current user created it then allow any manipulation
  if (req.order && req.user && req.order.user && req.order.user.id === req.user.id) {
    return next();
  }

  if (req.user && req.user.roles.includes('volunteer') && req.user.active === false) {
    return res.status(403).json({
      message: 'User is not authorized'
    });
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
