'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Service = mongoose.model('Service');

let doc = new Service({
  _id: 'ride',
  active: false,
  title: 'Rides',
  description:
    'A transportation service for adults age 60 and older. Clients phone in their detailed needs and we connect them to an avalible volunteer.',
  for: 'Client',
  price: 20,
  avalibility: 'On-demand',
  pricePer: 'Unit',
  unitName: 'Ride'
});

/**
 * Create a Service
 */
exports.seed = function(done) {
  Service.find(
    {
      title: doc.title
    },
    function(err, docs) {
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
    }
  );
};
