'use strict';

/**
 * Module dependencies.
 */
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Request = require(path.resolve('./modules/services/server/request.model'));
const Item = require(path.resolve('./modules/groceries/server/orders/grocery.model'));
const Delivery = require(path.resolve('./modules/groceries/server/orders/delivery.model'));

/**
 * Orders to go Schema
 */
let OrderSchema = new Schema({
  type: {
    type: String,
    default: 'order'
  },
  items: {
    type: [Item.schema]
  },
  subtotal: {
    type: Number
  },
  tax: {
    type: Number
  },
  recieptTotal: {
    type: Number,
    default: 0
  },
  deliveryCost: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: 'An order must have a total.'
  },
  // TODO: Make the reciept optional
  recieptImage: String,
  confirmed: Boolean,
  // payment info
  delivery: Delivery,
  status: {
    type: String,
    default: 'pending',
    enum: [
      'pending',
      'ordered',
      'incart',
      'purchased',
      'delivered',
      'canceled',
      'refunded'
    ]
  }
});


// mongoose.model('Order', OrderSchema);

Request.discriminator('Order', OrderSchema);
