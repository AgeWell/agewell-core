'use strict';

/**
 * Module dependencies
 */
let acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Volunteers Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/volunteers',
      permissions: ['get']
    }, {
      resources: '/api/volunteers/:volunteerId',
      permissions: ['get', 'put', 'delete']
    }]
  }, {
    roles: ['volunteer'],
    allows: [{
      resources: '/api/volunteers',
      permissions: ['get', 'post']
    }, {
      resources: '/api/volunteers/:volunteerId',
      permissions: ['get', 'post', 'put']
    }]
  }]);
};

/**
 * Check If Volunteers Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Volunteer is being processed and the current user created it then allow any manipulation
  if (req.volunteer && req.user && req.volunteer.userId && req.volunteer.userId.toString() === req.user._id.toString()) {
    return next();
  }

  if (req.method !== 'GET' && req.volunteer && req.user && req.user.roles.includes('volunteer') && req.user.active === false) {
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
