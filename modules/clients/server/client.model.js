'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Client Schema
 */
var ClientSchema = new Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    default: mongoose.Types.ObjectId
  },
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
  comments: String
  // placements: String,
});

ClientSchema.virtual('contact', {
  ref: 'Contact',
  localField: '_id',
  foreignField: 'clientId',
  justOne: true
});

mongoose.model('Client', ClientSchema);
