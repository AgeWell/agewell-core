'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Groceries to go Schema
 */
let GroceriesToGoSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Groceries to go name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('GroceriesToGo', GroceriesToGoSchema);
