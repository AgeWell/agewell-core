'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Volunteer = mongoose.model('Volunteer');
const docArray = require('./volunteers.data');

/**
 * Create a Volunteer
 */
exports.seed = function(done) {

  var total = docArray.length,
    result = [];

  function saveAll() {
    var doc = new Volunteer(docArray.pop());

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

  Volunteer.find({}, function(err, volunteers) {
    if (volunteers.length < total) {
      saveAll();
    }
  });
};
