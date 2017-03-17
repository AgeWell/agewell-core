'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Volunteer Schema
 */
var VolunteerSchema = new Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    default: mongoose.Types.ObjectId
  },
  volunteerNo: Number,
  // GroupOfVolunteers: Boolean,
  // GroupName: String,
  startingDate: {
    type: Date,
    default: Date.now
  },
  active: Boolean,
  terminated: Boolean,
  terminationCause: String,
  RSVPVolunteer: Boolean,
  driversLicense: String,
  driversLicenseExpiration: {
    type: Date,
    default: Date.now
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
  // Location: String, // TODO: Using a keyword, so should be changed
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
});

VolunteerSchema.virtual('contact', {
  ref: 'Contact',
  localField: '_id',
  foreignField: 'volunteerId',
  justOne: true
});

mongoose.model('Volunteer', VolunteerSchema);
