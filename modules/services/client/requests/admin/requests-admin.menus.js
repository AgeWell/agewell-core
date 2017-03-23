(function () {
  'use strict';

  angular
    .module('requests.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Requests module
  function menuConfig(menuService) {
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Requests',
      state: 'admin.requests.list'
    });
  }
}());
