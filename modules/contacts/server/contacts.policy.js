'use strict';

/**
 * Module dependencies
 */
let acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Contacts Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/contacts',
      permissions: '*'
    }, {
      resources: '/api/contacts/:contactId',
      permissions: '*'
    }]
  }, {
    roles: ['volunteer'],
    allows: [{
      resources: '/api/contacts',
      permissions: ['get', 'post', 'put']
    }, {
      resources: '/api/contacts/:volunteerId',
      permissions: ['get', 'post', 'put']
    }]
  }]);
};

/**
 * Check If Contacts Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Contact is being processed and the current user created it then allow any manipulation
  if (req.contact && req.user && req.contact.user && req.contact.user.id === req.user.id) {
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
