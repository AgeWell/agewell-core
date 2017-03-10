'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Service = mongoose.model('Service');

let docArray = [{
  'price': 10,
  'avalibility': 'Weekly',
  'pricePer': 'Unit',
  'unitName': 'Delivery',
  'created': '2017-03-10T22:16:12.122Z',
  'description': 'A grocery shopping and delivery service for adults age 60 and older. Clients phone in their order and we shop for them and deliver to their door and assist them with putting the groceries away if necessary. This service includes a wellness check.\nMeal planning and preparation are available for an additional fee.',
  'title': 'Groceries to Go'
}];

/**
 * Create a Service
 */
exports.seed = function(done) {

  var total = docArray.length,
    result = [];

  function saveAll() {
    var doc = new Service(docArray.pop());

    doc.save(function(err, saved) {
      if (err) {
        throw console.error(err);
      }

      result.push(saved[0]);

      if (total - 1) {
        return saveAll();
      }
      return done();
    });
  }

  saveAll();
};
