'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Volunteer Schema
 */
var VolunteerSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Volunteer name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  'Volunteer No.': Number,
  'Group of Volunteers': Boolean,
  'Group Name': String,
  'Mailing Name': String,
  'Starting Date': {
    type: Date,
    default: Date.now
  },
  Terminated: Boolean,
  'Termination Cause': String,
  // Years and Months of Service 1 years, 2 months (as of 02/14/2017)
  // Birth Date and Age 04/15/1995, 21 (as of 02/14/2017)
  'RSVP Volunteer': Boolean,
  // Sex M
  // Ethnicity Not Hispanic/Latino
  // Racial Group White
  'Veteran': Boolean,
  'Has Disability': Boolean,
  'Disability': String,
  'Driver\'s License': String,
  'Driver\'s License Expiration': {
    type: Date,
    default: Date.now
  },
  'Allergies': String,
  'Lifetime Pledges $': Number,
  'Lifetime Donations $': Number,
  'Lifetime Hours': Number,
  'Wants Reimbursement': Boolean,
  'Needs Timesheet': Boolean,
  'Needs Mailing Label': Boolean,
  'Stipended Volunteer': Boolean,
  'Senior Companion Leader (SCL)': Boolean,
  'Senior Companion Recruited by SCL': Boolean,
  'Community Volunteer Recruited by SCL': Boolean,
  'Photo ID provided': Boolean,
  'Release of Information signed': Boolean,
  'Confidentiality Agreement signed': Boolean,
  'Proof of Insurance provided': Boolean,
  'MVR Release signed': Boolean,
  'County/Area': String,
  'Education': String,
  'Employer Past or Present': String,
  'Occupation Past or Present': String,
  'Location': String,
  'Source': String,
  'Transportation': String,
  'Skills': {
    type: String,
    enum: []
  },
  'Groups': String,
  'Awards': String,
  'Available Times': String,
  'Address 1': String,
  'Added': {
    type: Date,
    default: Date.now
  },
  'Revised': {
    type: Date,
    default: Date.now
  },
  Comments: String,
  Placements: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

mongoose.model('Volunteer', VolunteerSchema);
