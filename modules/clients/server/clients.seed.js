'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Client = mongoose.model('Client');

let docArray = [{
  '_id': '58cc257b0ed1c8650836036a',
  'monthlyIncomeSingle': '$1,486-1,980',
  'transportation': 'No I am unable to drive',
  'started': new Date('2017-03-17T18:05:47.699Z')
}];

/**
 * Create a Client
 */
exports.seed = function(done) {

  var total = docArray.length,
    result = [];

  function saveAll() {
    var doc = new Client(docArray.pop());

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

  Client.find({}, function(err, clients) {
    if (clients.length !== total) {
      saveAll();
    }
  });
};
