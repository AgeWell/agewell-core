'use strict';

/**
 * Module dependencies
 */
const passport = require('passport');
const validator = require('validator');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');

module.exports = function() {
  // Use local strategy
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({
      email: email.toLowerCase()
    })
    .populate('contact')
    .exec(function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user || !user.authenticate(password)) {
        return done(null, false, {
          message: 'Invalid username or password (' + (new Date()).toLocaleTimeString() + ')'
        });
      }

      return done(null, user);
    });
  }));
};
