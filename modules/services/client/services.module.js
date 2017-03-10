(function(app) {
  'use strict';

  app.registerModule('services');
  app.registerModule('services.admin', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
