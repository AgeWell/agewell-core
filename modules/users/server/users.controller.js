'use strict';

/**
 * Module dependencies
 */
const _ = require('lodash');

/**
 * Extend user's controller
 */
module.exports = _.extend(
  require('./auth/users.authentication.controller'),
  require('./auth/users.authorization.controller'),
  require('./auth/users.password.controller'),
  require('./users.profile.controller')
);
