'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Groceries to go Schema
 */
let GrocerySchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Grocery item name',
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

mongoose.model('Grocery', GrocerySchema);
