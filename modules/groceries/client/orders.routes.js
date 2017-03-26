(function() {
  'use strict';

  angular
    .module('groceriesToGo')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('groceries.orders', {
        url: '',
        templateUrl: 'modules/groceries/client/views/list-orders.html',
        controller: 'GroceriesToGosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Groceries to gos List'
        }
      })
      .state('groceries.order', {
        url: '/order',
        templateUrl: 'modules/groceries/client/views/form-order.html',
        controller: 'GroceriesToGosController',
        controllerAs: 'vm',
        resolve: {
          groceriesResolve: newGroceriesToGo
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Groceries to gos Create'
        }
      })
      .state('groceries.edit', {
        url: '/:orderId/edit',
        templateUrl: 'modules/groceries/client/views/form-order.html',
        controller: 'GroceriesToGosController',
        controllerAs: 'vm',
        resolve: {
          groceriesResolve: getGroceriesToGo
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Groceries to go {{ groceriesResolve.name }}'
        }
      })
      .state('groceries.view', {
        url: '/:orderId',
        templateUrl: 'modules/groceries/client/views/view-order.html',
        controller: 'GroceriesToGosController',
        controllerAs: 'vm',
        resolve: {
          groceriesResolve: getGroceriesToGo
        },
        data: {
          pageTitle: 'Groceries to go {{ groceriesResolve.name }}'
        }
      });
  }

  getGroceriesToGo.$inject = ['$stateParams', 'GroceriesToGosService'];

  function getGroceriesToGo($stateParams, GroceriesToGosService) {
    return GroceriesToGosService.get({
      groceriesToGoId: $stateParams.groceriesToGoId
    }).$promise;
  }

  newGroceriesToGo.$inject = ['GroceriesToGosService'];

  function newGroceriesToGo(GroceriesToGosService) {
    return new GroceriesToGosService();
  }
}());
