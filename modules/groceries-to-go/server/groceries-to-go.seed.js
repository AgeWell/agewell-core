'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Service = mongoose.model('Service');

let doc = new Service({
  _id: 'groceriesToGo',
  active: false,
  title: 'Groceries to Go',
  description: 'A grocery shopping and delivery service for adults age 60 and older. Clients phone in their order and we shop for them and deliver to their door and assist them with putting the groceries away if necessary. This service includes a wellness check.\nMeal planning and preparation are available for an additional fee.',
  for: 'Client',
  price: 10,
  avalibility: 'Weekly',
  pricePer: 'Unit',
  'unitName': 'Delivery'
});

/**
 * Create a Service
 */
exports.seed = function(done) {
  Service.find({
    title: doc.title
  }, function(err, docs) {
    if (docs.length) {
      console.log(doc.title + ' exists already');
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
