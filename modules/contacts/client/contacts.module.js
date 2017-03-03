(function (app) {
  'use strict';

  app.registerModule('contacts');
  app.registerModule('contacts.address', ['contacts', 'ui.select', 'ngSanitize']);
}(ApplicationConfiguration));
