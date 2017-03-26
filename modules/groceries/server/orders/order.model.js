'use strict';

/**
 * Module dependencies.
 */
const shortid = require('shortid');
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Request = require(path.resolve('./modules/services/server/requests/request.model'));

/**
 * Orders to go Schema
 */
let OrderSchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  name: {
    type: String,
    default: '',
    required: 'Please fill Order name.',
    trim: true
  },
  qty: Number,
  unit: String,
  price: Number,
  category: {
    type: String,
    enum: [
      'Produce',
      'Deli',
      'Meats',
      'Dairy/Refrigerated',
      'Bakery',
      'Frozen',
      'Miscellaneous',
      'Non-food'
    ]
  }
});

// mongoose.model('Order', OrderSchema);
Request.discriminator('Order', OrderSchema);
