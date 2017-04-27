'use strict';

/**
 * Module dependencies.
 */
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Service = require(path.resolve('./modules/services/server/service.model.js'));

/**
 * Client Schema
 */
var ClientSchema = new Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    default: mongoose.Types.ObjectId
  },
  started: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  },
  services: {
    type: [{
      service: Service,
      active: Boolean
    }]
  },
  groceryCallList: {
    type: Boolean,
    default: false
  },
  lastSkip: Date,
  // socialSecurity: Number Maybe later
  monthlyIncomeSingle: {
    type: String,
    enum: ['< $990', '$990-1,485', '$1,486-1,980', '> $1,980']
  },
  monthlyIncomeMarried: {
    type: String,
    enum: ['< $1,335', '$1,336-2,003', '$2,004-2,670', '> $2,670']
  },
  referralSource: String,
  transportation: {
    type: String,
    enum: ['Yes I am able to drive', 'No I am unable to drive']
  },
  // Referred to--CHANGE THIS LIST
  comments: String
  // placements: String,
});

ClientSchema.virtual('contact', {
  ref: 'Contact',
  localField: '_id',
  foreignField: 'client',
  justOne: true
});

mongoose.model('Client', ClientSchema);
