'use strict';

var validator = require('validator'),
  path = require('path'),
  mongoose = require('mongoose'),
  config = require(path.resolve('./config/config'));

/**
 * Render the main application page
 */
exports.renderIndex = function(req, res) {
  let safeUserObject = null;

  if (req.user) {
    safeUserObject = {
      displayName: validator.escape(req.user.displayName),
      provider: validator.escape(req.user.provider),
      username: validator.escape(req.user.username),
      created: req.user.created.toString(),
      roles: req.user.roles,
      profileImageURL: req.user.profileImageURL,
      email: validator.escape(req.user.email),
      lastName: validator.escape(req.user.lastName),
      firstName: validator.escape(req.user.firstName),
      additionalProvidersData: req.user.additionalProvidersData
    };
  }

  res.render('modules/core/server/index', {
    user: JSON.stringify(safeUserObject),
    options: JSON.stringify(getEnums()),
    sharedConfig: JSON.stringify(config.shared)
  });
};

/**
 * Render the server error page
 */
exports.renderServerError = function(req, res) {
  res.status(500).render('modules/core/server/errors/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function(req, res) {

  res.status(404).format({
    'text/html': function() {
      res.render('modules/core/server/errors/404', {
        url: req.originalUrl
      });
    },
    'application/json': function() {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function() {
      res.send('Path not found');
    }
  });
};

// Helper Functions

function getEnums() {
  let options = {};

  // loop through all the models
  for (let model in mongoose.modelSchemas) {
    if (mongoose.modelSchemas.hasOwnProperty(model)) {
      let schema = mongoose.modelSchemas[model];
      options[model] = {};

      // loop through all the fields
      for (let path in schema.paths) {
        if (schema.paths.hasOwnProperty(path)) {

          // check if field has enum and if length is greater than 0
          if (typeof schema.paths[path].enumValues !== 'undefined' && schema.paths[path].enumValues.length > 0) {
            options[model][path] = schema.paths[path].enumValues;
          }
        }
      }
    }
  }

  return options;
}
