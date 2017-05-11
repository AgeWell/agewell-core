(function () {
  'use strict';

  angular
    .module('groceries')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Groceries',
      state: 'groceries',
      type: 'dropdown',
      roles: ['admin', 'volunteer']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'groceries', {
      title: 'Pick List',
      state: 'groceries.list',
      roles: ['admin', 'volunteer']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'groceries', {
      title: 'Checkout List',
      state: 'groceries.checkout',
      roles: ['admin', 'volunteer']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'groceries', {
      title: 'Create Client',
      state: 'groceries.delivery',
      roles: ['admin', 'volunteer']
    });
  }
}());
