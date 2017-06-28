'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const User = mongoose.model('User');
const docArray = require('./users.data');

/**
 * Create a User
 */
exports.seed = function(done) {

  var total = docArray.length,
    result = [];

  function saveAll() {
    var doc = new User(docArray.pop());

    doc.save(function(err, saved) {
      if (err) {
        throw console.error(err);
      }

      result.push(saved[0]);

      if (result.length !== total) {
        return saveAll();
      }
      return done();
    });
  }

  User.find({}, function(err, users) {
    if (users.length < total) {
      saveAll();
    }
  });
};
