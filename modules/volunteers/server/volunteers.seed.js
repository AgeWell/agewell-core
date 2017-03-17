'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Volunteer = mongoose.model('Volunteer');

let docArray = [{
  '_id': '58cc2d921206fd7fed39c01c',
  'driversLicenseExpiration': new Date('2017-03-17T18:40:18.987Z'),
  'startingDate': new Date('2017-03-17T18:40:18.987Z')
}];

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
    if (volunteers.length !== total) {
      saveAll();
    }
  });
};
