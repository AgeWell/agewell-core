'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const User = mongoose.model('User');

let docArray = [{
  '_id': '5902a3b1f265c60ad490611c',
  'displayName': 'Test Admin',
  'provider': 'local',
  'roles': [
    'user',
    'admin'
  ],
  'email': 'admin@agewellarrowhead.com',
  'password': process.env.PASSWORD,
  'lastName': 'Admin',
  'firstName': 'Test'
}, {
  '_id': '5902a444f265c60ad490611e',
  'displayName': 'Test Volunteer',
  'provider': 'local',
  'roles': [
    'user',
    'volunteer'
  ],
  'email': 'volunteer@agewellarrowhead.com',
  'password': process.env.PASSWORD,
  'lastName': 'Volunteer',
  'firstName': 'Test',
  'active': true
}];

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
    if (users.length !== total) {
      saveAll();
    }
  });
};
