'use strict';

/**
 * Module dependencies.
 */
const shortid = require('shortid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Groceries to go Schema
 */
let GrocerySchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  name: {
    type: String,
    default: '',
    required: 'Please fill Grocery item name',
    trim: true
  },
  qty: Number,
  inCart: {
    type: Boolean,
    default: false
  },
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

module.exports = mongoose.model('Grocery', GrocerySchema);
