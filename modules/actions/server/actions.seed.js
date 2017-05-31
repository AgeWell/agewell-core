'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Action = mongoose.model('Action');

let doc = new Action({
  _id: 'testAction',
  created: new Date('2017-04-28T23:03:55.629Z'),
  complete: false,
  clientId: '59036c9bf3895a15640d781a',
  notes: 'A action shopping and delivery service for adults age 60 and older. Clients phone in their order and we shop for them and deliver to their door and assist them with putting the actions away if necessary.'
});

/**
 * Create a Action
 */
exports.seed = function(done) {
  Action.find({
    _id: doc._id
  }, function(err, docs) {
    if (docs.length) {
      console.log(doc._id + ' exists already');
      return done();
    }
    doc.save(function(err) {
      if (err) {
        return console.error(err);
      }
      return done();
    });
  });
};
