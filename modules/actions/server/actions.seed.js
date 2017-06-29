'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Action = mongoose.model('Action');
const docArray = require('./actions.data');

/**
 * Create a Action
 */
exports.seed = function(done) {

  var total = docArray.length,
    result = [];

  function saveAll() {
    var doc = new Action(docArray.pop());

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

  Action.find({}, function(err, actions) {
    if (actions.length < total) {
      saveAll();
    }
  });
};
