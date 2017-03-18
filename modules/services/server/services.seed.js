'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Service = mongoose.model('Service');

let docArray = [{
  _id: 'careConsultation',
  title: 'Care Consultation',
  description: 'Care consultation is a person centered service that connects older adults to resources that support healthy aging and independence. Navigating the aging services spectrum can be very challenging. Our experienced care consultants work one-on-one with clients to customize actions plans and connect them with services that support their goal of remaining active and independent.',
  serviceFor: 'Client',
  price: 35,
  avalibility: 'On-demand',
  pricePer: 'Hour'
}, {
  _id: 'choreAssistance',
  title: 'Chore',
  description: 'Assistance in the home such as heavy housework including washing floors, windows and walls, basic home maintenance, or removal of large household furnishings, yard work or sidewalk maintenance including shoveling.',
  serviceFor: 'Client',
  price: 20,
  avalibility: 'On-demand',
  pricePer: 'Hour'
}, {
  _id: 'homemakerAssistance',
  title: 'Homemaker',
  description: 'Assistance with light house work such as vacuuming, doing dishes, laundry, meal preparation, bill paying and making telephone calls.',
  serviceFor: 'Client',
  price: 20,
  avalibility: 'On-demand',
  pricePer: 'Hour'
}, {
  _id: 'caregiverCounseling',
  title: 'Caregiver Counseling',
  description: 'Caregiver Counseling provides support and assistance to caregivers that need to make decisions and problem solve issues related to caregiving. This includes individual or family counseling, support groups, and caregiver training and education.',
  serviceFor: 'Caregiver',
  price: 35,
  avalibility: 'On-demand',
  pricePer: 'Hour'
}, {
  _id: 'reachConsultation',
  title: 'REACH',
  description: 'REACH is an evidence based caregiver consultation service focused on those who care for someone with Alzheimer’s disease or a related dementia. REACH helps caregivers manage behavioral concerns, reduce caregiver burden and improve or sustain caregiver physical and emotional health.',
  serviceFor: 'Caregiver',
  price: 35,
  avalibility: 'On-demand',
  pricePer: 'Hour'
}, {
  _id: 'seniorWheelTransportation',
  title: 'Senior Wheel',
  description: 'Affordable transportation for adults 60 years of age and older to and from medical appointments.',
  serviceFor: 'Client',
  price: 20,
  avalibility: 'On-demand',
  pricePer: 'Unit',
  'unitName': 'Appointment'
}, {
  _id: 'errandsTransportation',
  title: 'Errands',
  description: 'Transportation service for adults age 60 and over to various nonmedical appointments or to pick up prescriptions or other nonfood items.',
  serviceFor: 'Client',
  price: 20,
  avalibility: 'On-demand',
  pricePer: 'Hour'
}, {
  _id: 'groceriesToGo',
  title: 'Groceries to Go',
  description: 'A grocery shopping and delivery service for adults age 60 and older. Clients phone in their order and we shop for them and deliver to their door and assist them with putting the groceries away if necessary. This service includes a wellness check.\nMeal planning and preparation are available for an additional fee.',
  serviceFor: 'Client',
  price: 10,
  avalibility: 'Weekly',
  pricePer: 'Unit',
  'unitName': 'Delivery'
}, {
  _id: 'dementiaTraining',
  title: 'Dementia Training',
  description: 'A customized dementia training for businesses including information about dementia and dementia related diseases such as Alzheimer’s disease, how to communicate with someone who has dementia and is on site at your business or organization, how to communicate in a retail setting, how to create a dementia friendly physical space, and help to become a dementia friendly workplace.  We work with organizations to identify and implement changes that promote a dementia friendly workplace.',
  serviceFor: 'Organization',
  price: 150,
  avalibility: 'On-demand',
  pricePer: 'Unit',
  'unitName': 'Training'
}];

/**
 * Create a Service
 */
exports.seed = function(done) {

  var total = docArray.length,
    result = [];

  function saveAll() {
    var doc = new Service(docArray.pop());

    doc.save(function(err, saved) {
      if (err) {
        throw console.error(err);
      }

      result.push(saved[0]);

      if (result.length !== total) {
        return saveAll();
      }
      return done();
    });
  }

  Service.find({}, function(err, services) {
    if (services.length !== total) {
      saveAll();
    }
  });
};
