'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Contact = require('../../contacts/server/contact.model');
// TODO intergrate the user check and check if user is set to active for query

/**
 * Volunteer Schema
 */
var VolunteerSchema = new Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    default: mongoose.Types.ObjectId
  },
  contact: Contact,
  userId: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  volunteerNo: Number,
  // GroupOfVolunteers: Boolean,
  // GroupName: String,
  started: {
    type: Date
  },
  terminated: Boolean,
  terminationCause: String,
  RSVPVolunteer: Boolean,
  driversLicense: String,
  driversLicenseExpiration: {
    type: Date
  },
  lifetimePledges: Number,
  lifetimeDonations: Number,
  lifetimeHours: Number,
  wantsReimbursement: Boolean,
  needsTimesheet: Boolean,
  needsMailingLabel: Boolean,
  stipendedVolunteer: Boolean,
  seniorCompanionLeader: Boolean, // SLC
  seniorCompanionRecruitedBySCL: Boolean,
  communityVolunteerRecruitedBySCL: Boolean,
  photoIDprovided: Boolean,
  releaseOfInformationSigned: Boolean,
  confidentialityAgreementSigned: Boolean,
  proofOfInsuranceProvided: Boolean,
  MVRReleaseSigned: Boolean,
  countyArea: String,
  employerPastPresent: String,
  occupationPastPresent: String,
  // Location: String, Using a keyword, so should be changed
  source: String,
  transportation: String,
  skills: {
    type: String,
    enum: []
  },
  // groups: String,
  // awards: String,
  availableTimes: String,
  comments: String
  // placements: String,
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

mongoose.model('Volunteer', VolunteerSchema);
