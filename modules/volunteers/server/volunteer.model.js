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
  'Volunteer No.': Number,
  // 'Group of Volunteers': Boolean,
  // 'Group Name': String,
  'Starting Date': {
    type: Date,
    default: Date.now
  },
  Terminated: Boolean,
  'Termination Cause': String,
  'RSVP Volunteer': Boolean,
  'Driver\'s License': String,
  'Driver\'s License Expiration': {
    type: Date,
    default: Date.now
  },
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
  Comments: String,
  Placements: String,
  contact: {
    type: Schema.ObjectId,
    ref: 'Contact'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

mongoose.model('Volunteer', VolunteerSchema);
