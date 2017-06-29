'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Client = mongoose.model('Client');
const docArray = require('./clients.data');

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
