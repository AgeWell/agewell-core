'use strict';

module.exports = [{
  '_id': '5902a3b1f265c60ad490611c',
  'displayName': 'Test Admin',
  'provider': 'local',
  'roles': [
    'user',
    'admin'
  ],
  'email': 'admin@agewellarrowhead.com',
  'password': process.env.PASSWORD,
  'lastName': 'Admin',
  'firstName': 'Test',
  'active': true
}, {
  '_id': '5902a444f265c60ad490611e',
  'displayName': 'Test Volunteer',
  'provider': 'local',
  'roles': [
    'user',
    'volunteer'
  ],
  'email': 'volunteer@agewellarrowhead.com',
  'password': process.env.PASSWORD,
  'lastName': 'Volunteer',
  'firstName': 'Test',
  'active': true
}];
