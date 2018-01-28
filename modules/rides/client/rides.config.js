(function () {
  'use strict';

  angular
    .module('rides')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Rides',
      state: 'rides',
      type: 'dropdown',
      roles: ['admin', 'volunteer']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'rides', {
      title: 'Assign List',
      state: 'rides.assign',
      roles: ['admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'rides', {
      title: 'Ride List',
      state: 'rides.list',
      roles: ['admin', 'volunteer']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'rides', {
      title: 'Completed List',
      state: 'rides.completed',
      roles: ['admin']
    });
  }
}());
