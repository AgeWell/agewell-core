(function (app) {
  'use strict';

  app.registerModule('clients');
  app.registerModule('clients.routes', ['ui.router', 'core.routes']);
  app.registerModule('clients.services');
}(ApplicationConfiguration));
