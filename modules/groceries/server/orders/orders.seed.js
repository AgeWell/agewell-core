'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

let docArray = [{
  '_id': 'SyNwcB-yZ',
  'requestNumber': 1,
  'clientId': '59036c9bf3895a15640d781a',
  'date': new Date('2017-04-28T23:03:55.629Z'),
  'subtotal': 0,
  'tax': 0,
  'recieptTotal': 0,
  'deliveryCost': 10,
  'total': 10,
  'notes': 'Voluptas voluptatem. Culpa, aspernatur distinctio. Fugiat vel ex facilis non doloribus fugiat, adipisci obcaecati et quod qui veritatis.',
  '__t': 'Order',
  'created': new Date('2017-04-28T23:03:55.650Z'),
  'status': 'ordered',
  'items': [{
    'category': 'Dairy/Refrigerated',
    'qty': 3,
    'name': 'Stone Walton'
  }, {
    'category': 'Frozen',
    'qty': 5,
    'name': 'Forrest Michael'
  }, {
    'category': 'Produce',
    'qty': 2,
    'name': 'Burke Wells'
  }]
}, {
  '_id': 'S11Y9Sb1-',
  'requestNumber': 2,
  'clientId': '59036cb5f3895a15640d7826',
  'date': new Date('2017-04-28T23:04:23.062Z'),
  'subtotal': 0,
  'tax': 0,
  'recieptTotal': 0,
  'deliveryCost': 10,
  'total': 10,
  'notes': 'Reprehenderit, consequatur libero qui dignissimos eos, quos qui odit nulla ut odit inventore deserunt suscipit.',
  '__t': 'Order',
  'created': new Date('2017-04-28T23:04:23.078Z'),
  'status': 'ordered',
  'items': [{
    'category': 'Meats',
    'qty': 4,
    'name': 'Noel Wyatt'
  }, {
    'category': 'Bakery',
    'qty': 3,
    'name': 'Robert Davis'
  }, {
    'category': 'Meats',
    'qty': 2,
    'name': 'Courtney Morton'
  }]
}, {
  '_id': 'rku5qSb1b',
  'requestNumber': 3,
  'clientId': '59036cbff3895a15640d782a',
  'date': new Date('2017-04-28T23:04:47.735Z'),
  'subtotal': 0,
  'tax': 0,
  'recieptTotal': 0,
  'deliveryCost': 10,
  'total': 10,
  'notes': 'Cillum beatae quis ad consectetur tempor hic dignissimos magnam quia laboris.',
  '__t': 'Order',
  'created': new Date('2017-04-28T23:04:47.757Z'),
  'status': 'ordered',
  'items': [{
    'category': 'Meats',
    'qty': 20,
    'name': 'Beau Stewart'
  }, {
    'category': 'Non-food',
    'qty': 4,
    'name': 'Clarke Shaffer'
  }, {
    'category': 'Meats',
    'qty': 50,
    'name': 'Ulric Daniel'
  }, {
    'category': 'Deli',
    'qty': 6,
    'name': 'Alexa Stark'
  }]
}, {
  '_id': 'HkxkRSW1W',
  'requestNumber': 4,
  'clientId': '59036cbff3895a15640d782a',
  'date': new Date('2017-04-28T23:18:47.885Z'),
  'subtotal': 0,
  'tax': 0,
  'recieptTotal': 0,
  'deliveryCost': 10,
  'total': 10,
  'notes': 'Accusantium quam dolor quibusdam cupiditate voluptate quis id et consequatur? Adipisicing recusandae. Ea delectus, et placeat.',
  '__t': 'Order',
  'created': new Date('2017-04-28T23:18:47.909Z'),
  'status': 'ordered',
  'items': [{
    'category': 'Dairy/Refrigerated',
    'qty': 4,
    'name': 'Devin Joyce'
  }, {
    'category': 'Frozen',
    'qty': 3,
    'name': 'Ebony Herrera'
  }, {
    'category': 'Meats',
    'qty': 1,
    'name': 'Ahmed Watkins'
  }, {
    'category': 'Non-food',
    'qty': 5,
    'name': 'Raven Colon'
  }]
}];

/**
 * Create a Volunteer
 */
exports.seed = function(done) {

  var total = docArray.length,
    result = [];

  function saveAll() {
    var doc = new Order(docArray.pop());

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

  Order.find({}, function(err, orders) {
    if (orders.length !== total) {
      // saveAll();
    }
  });
};
