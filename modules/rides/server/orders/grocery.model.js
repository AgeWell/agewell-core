'use strict';

/**
 * Module dependencies.
 */
const shortid = require('shortid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Rides Schema
 */
let RideSchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  name: {
    type: String,
    default: '',
    required: 'Please fill Ride item name',
    trim: true
  },
  qty: Number,
  inCart: {
    type: Boolean,
    default: false
  },
  notAvailable: {
    type: Boolean,
    default: false
  },
  unit: {
    type: String,
    enum: [
      'item',
      'oz.',
      'lb.',
      'quart',
      'gallon',
      'dozen'
    ]
  },
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

module.exports = mongoose.model('Ride', RideSchema);
