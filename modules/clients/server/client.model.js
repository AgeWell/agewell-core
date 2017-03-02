'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Client Schema
 */
var ClientSchema = new Schema({
  startingDate: {
    type: Date,
    default: Date.now
  },
  active: Boolean,
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
  comments: String,
  // placements: String,
  contact: {
    type: Schema.ObjectId,
    ref: 'Contact'
  }
});

mongoose.model('Client', ClientSchema);
