'use strict';

/**
 * Module dependencies.
 */
const shortid = require('shortid');
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Request = require(path.resolve('./modules/services/server/requests/request.model'));
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
  recieptImage: String,
  confirmed: Boolean,
  // payment info
  delivery: {
    payment: {
      type: String,
      enum: [
        'Cash',
        'Check',
        'Credit Card'
      ],
      required: 'Please select a payment option.'
    },
    method: {
      type: String,
      enum: [
        'To The Door',
        'Brought Inside',
        'Unpacked'
      ],
      required: 'Please select a delivery method.'
    },
    followup: {
      type: Boolean,
      required: 'You need to determine if a follow up is required.'
    },
    notes: String
  },
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
