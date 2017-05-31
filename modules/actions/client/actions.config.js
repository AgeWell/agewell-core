(function () {
  'use strict';

  angular
    .module('actions')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    // menuService.addMenuItem('topbar', {
    //   title: 'Actions',
    //   state: 'actions',
    //   type: 'dropdown',
    //   roles: ['admin', 'volunteer']
    // });
    //
    // // Add the dropdown list item
    // menuService.addSubMenuItem('topbar', 'actions', {
    //   title: 'Pick List',
    //   state: 'actions.list',
    //   roles: ['admin', 'volunteer']
    // });
    //
    // // Add the dropdown list item
    // menuService.addSubMenuItem('topbar', 'actions', {
    //   title: 'Checkout List',
    //   state: 'actions.checkout',
    //   roles: ['admin', 'volunteer']
    // });
    //
    // // Add the dropdown create item
    // menuService.addSubMenuItem('topbar', 'actions', {
    //   title: 'Delivery List',
    //   state: 'actions.delivery',
    //   roles: ['admin', 'volunteer']
    // });
  }
}());
