'use strict';

/**
 * Module dependencies
 */
var passport = require('passport'),
  refresh = require('passport-oauth2-refresh'),
  HarvestStrategy = require('passport-harvest').Strategy,
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function(config) {
  // Use google strategy
  let harvest = new HarvestStrategy({
    authorizationURL: config.harvest.authorizationURL,
    tokenURL: config.harvest.tokenURL,
    clientID: config.harvest.clientID,
    clientSecret: config.harvest.clientSecret,
    callbackURL: config.harvest.callbackURL,
    passReqToCallback: true
  }, function(req, accessToken, refreshToken, profile, done) {
    let now = new Date();

    User.findById(req.user._id, function(err, user) {
      if (err) {
        return done(err);
      }
      user.harvest = {
        token: accessToken,
        refreshToken: refreshToken,
        expires: now.setSeconds(now.getSeconds() + 64799000),
        profile: profile
      };

      user.save(function(err) {
        if (err) {
          return done(err);
        }
        return done(null, user);
      });
    });
  });

  passport.use(harvest);
  refresh.use(harvest);
};
