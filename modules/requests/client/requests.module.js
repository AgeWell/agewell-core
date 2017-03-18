(function (app) {
  'use strict';

  app.registerModule('requests');
  app.registerModule('requests.admin', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
