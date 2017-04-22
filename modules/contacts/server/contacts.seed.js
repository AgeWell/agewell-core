'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');

let docArray = [{
  '_id': '58cc257b0ed1c86508360368',
  'client': '58cc257b0ed1c8650836036a',
  'address': {
    'street': '123 Main St',
    'city': 'Duluth',
    'state': 'MN',
    'zipcode': 55802
  },
  'homePhone': '555-555-5555',
  'workPhone': '555-555-5555',
  'cellPhone': '555-555-5555',
  'birthday': new Date('1954-06-20T18:05:47.693Z'),
  'gender': 'Male',
  'veteran': true,
  'ethnicity': 'Not Hispanic/Latino',
  'race': 'Biracial or Multiracial',
  'maritalStatus': 'Single',
  'education': 'Highschool',
  'hasDisability': true,
  'disability': 'Bad Hearing',
  'created': new Date('2017-03-17T18:05:47.693Z'),
  'email': 'info@simplyspoke.com',
  'name': {
    'first': 'John',
    'last': 'Smith'
  }
}, {
  '_id': '58cc2d921206fd7fed39c01a',
  'volunteer': '58cc2d921206fd7fed39c01c',
  'address': {
    'street': '123 Some St.',
    'city': 'Duluth',
    'state': 'MN',
    'zipcode': 55805
  },
  'homePhone': '555-555-5555',
  'workPhone': '555-555-5555',
  'cellPhone': '555-555-5555',
  'gender': 'Female',
  'ethnicity': 'Hispanic',
  'race': 'Other',
  'maritalStatus': 'Married',
  'education': 'Some',
  'allergies': 'Peanut Butter',
  'created': new Date('2017-03-17T18:40:18.980Z'),
  'email': 'tristan@simplyspoke.com',
  'name': {
    'first': 'Jane',
    'last': 'Doe'
  }
}];

/**
 * Create a Contact
 */
exports.seed = function(done) {

  var total = docArray.length,
    result = [];

  function saveAll() {
    var doc = new Contact(docArray.pop());

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

  Contact.find({}, function(err, contacts) {
    if (contacts.length < total) {
      saveAll();
    }
  });
};
