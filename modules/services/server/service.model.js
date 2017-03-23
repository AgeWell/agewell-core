'use strict';

/**
 * Module dependencies.
 */
const shortid = require('shortid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Service Schema
 */
let ServiceSchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
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
  type: {
    type: String,
    enum: ['Service', 'Order', 'Training'],
    default: 'Service'
  },
  for: {
    type: String,
    enum: ['Client', 'Caregiver', 'Organization'],
    required: 'Who is this service for?'
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
    enum: ['Hour', 'Unit'],
    required: 'Please choose pricing unit'
  },
  unitName: String,
  // neededSkill: {
  //   type: [String],
  //   enum: []
  // },
  active: Boolean,
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Service', ServiceSchema);
