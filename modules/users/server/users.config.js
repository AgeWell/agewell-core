'use strict';

/**
 * Module dependencies
 */
const passport = require('passport');
const User = require('mongoose').model('User');
const path = require('path');
const config = require(path.resolve('config/config'));

/**
 * Module init function
 */
module.exports = function(app, db) {
  // Serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Deserialize sessions
  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    })
    .populate('contact')
    .exec(function(err, user) {

      done(err, user);
    });
  });

  // Initialize strategies
  config.utils.getGlobbedPaths(path.join(__dirname, './auth/strategies/*.js')).forEach(function(strategy) {
    require(path.resolve(strategy))(config);
  });

  // Add passport's middleware
  app.use(passport.initialize());
  app.use(passport.session());
};
