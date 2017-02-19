(function () {
  'use strict';

  angular
    .module('volunteers')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Volunteers',
      state: 'volunteers',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'volunteers', {
      title: 'List Volunteers',
      state: 'volunteers.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'volunteers', {
      title: 'Create Volunteer',
      state: 'volunteers.create',
      roles: ['user']
    });
  }
}());
