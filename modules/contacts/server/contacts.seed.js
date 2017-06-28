'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');
const docArray = require('./contacts.data');

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
