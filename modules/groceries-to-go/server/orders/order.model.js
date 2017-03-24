'use strict';

/**
 * Module dependencies.
 */
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Request = require(path.resolve('./modules/services/server/requests/request.model'));

/**
 * Orders to go Schema
 */
let OrderSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Order.',
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

mongoose.model('Order', OrderSchema);
