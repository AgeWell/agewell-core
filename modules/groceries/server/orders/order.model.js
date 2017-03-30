'use strict';

/**
 * Module dependencies.
 */
const shortid = require('shortid');
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Request = require(path.resolve('./modules/services/server/requests/request.model'));
const Money = require(path.resolve('./modules/services/server/money.model')).schema;
const Item = require(path.resolve('./modules/groceries/server/groceries/grocery.model'));

/**
 * Orders to go Schema
 */
let OrderSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  items: {
    type: [Item]
  },
  subtotal: {
    type: Money,
    required: true
  },
  deliveryCost: {
    type: Number,
    required: true
  },
  total: {
    type: Money,
    required: 'An order must have a total.'
  },
  // payment info
  status: {
    type: String,
    default: 'pending',
    enum: [
      'pending',
      'ordered',
      'purchased',
      'delivered',
      'canceled',
      'refunded'
    ]
  }
});

// mongoose.model('Order', OrderSchema);
Request.discriminator('Order', OrderSchema);
