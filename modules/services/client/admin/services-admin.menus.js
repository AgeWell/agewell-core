(function () {
  'use strict';

  angular
    .module('services.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Services module
  function menuConfig(menuService) {
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Services',
      state: 'admin.services.list'
    });
  }
}());
