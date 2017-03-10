'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Service Schema
 */
let ServiceSchema = new Schema({
  title: {
    type: String,
    default: '',
    required: 'Please enter a title',
    trim: true
  },
  description: {
    type: String,
    default: '',
    required: 'Please enter a description',
    trim: true
  },
  avalibility: {
    type: String,
    enum: ['On-demand', 'Weekly', 'Monthly'],
    required: 'Please choose an avalibility'
  },
  price: {
    type: Number,
    required: 'Please set a price'
  },
  pricePer: {
    type: String,
    enum: ['Hour', 'Unit', 'Month'],
    required: 'Please choose pricing unit'
  },
  unitName: String,
  // neededSkill: {
  //   type: [String],
  //   enum: []
  // },
  created: {
    type: Date,
    default: Date.now
  }
});

// Getter
ServiceSchema.path('price').get(function(num) {
  return (num / 100).toFixed(2);
});

// Setter
ServiceSchema.path('price').set(function(num) {
  return num * 100;
});

mongoose.model('Service', ServiceSchema);
