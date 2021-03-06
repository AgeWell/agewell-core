'use strict';

/**
 * Module dependencies
 */
let acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Clients Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/clients',
      permissions: '*'
    }, {
      resources: '/api/clients/:clientId',
      permissions: '*'
    }]
  }, {
    roles: ['volunteer'],
    allows: [{
      resources: '/api/clients',
      permissions: ['get']
    }, {
      resources: '/api/clients/:clientId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Clients Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Client is being processed and the current user created it then allow any manipulation
  if (req.client && req.user && req.client.user && req.client.user.id === req.user.id) {
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
