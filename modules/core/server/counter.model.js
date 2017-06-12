'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Counter Schema
 */
const CounterSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  seq: {
    type: Number,
    default: 0
  }
});

module.exports = CounterSchema;
mongoose.model('Counter', CounterSchema);
