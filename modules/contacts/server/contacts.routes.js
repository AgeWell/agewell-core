'use strict';

/**
 * Module dependencies
 */
var contactsPolicy = require('./contacts.policy'),
  contacts = require('./contacts.controller');

module.exports = function(app) {
  // Contacts Routes
  app.route('/api/contacts').all(contactsPolicy.isAllowed)
    .get(contacts.list)
    .post(contacts.create);

  app.route('/api/contacts/:contactId').all(contactsPolicy.isAllowed)
    .get(contacts.read)
    .put(contacts.update)
    .delete(contacts.delete);

  // Finish by binding the Contact middleware
  app.param('contactId', contacts.contactByID);
};
