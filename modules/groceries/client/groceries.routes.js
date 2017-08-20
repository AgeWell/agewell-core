(function() {
  'use strict';

  angular
    .module('groceries')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('groceries', {
        abstract: true,
        url: '/groceries',
        template: '<ui-view/>'
      })
      .state('groceries.assign', {
        url: '/assign',
        templateUrl: '/modules/groceries/client/views/assign.html',
        controller: 'AssignController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Groceries To Go - Assign'
        }
      })
      .state('groceries.list', {
        url: '/list',
        templateUrl: '/modules/groceries/client/views/picklist.html',
        controller: 'PicklistController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Groceries To Go - Picklist'
        }
      })
      .state('groceries.checkout', {
        url: '/checkout',
        templateUrl: '/modules/groceries/client/views/checkout.html',
        controller: 'CheckoutController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Groceries To Go - Checkout'
        }
      })
      .state('groceries.delivery', {
        url: '/delivery',
        templateUrl: '/modules/groceries/client/views/delivery.html',
        controller: 'DeliveryController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Groceries To Go - Delivery'
        }
      });
  }

  getGroceriesToGo.$inject = ['$stateParams', 'GroceriesService'];

  function getGroceriesToGo($stateParams, GroceriesService) {
    return GroceriesService.get({
      groceriesToGoId: $stateParams.groceriesToGoId
    }).$promise;
  }

  newGroceriesToGo.$inject = ['GroceriesService'];

  function newGroceriesToGo(GroceriesService) {
    return new GroceriesService();
  }
}());
