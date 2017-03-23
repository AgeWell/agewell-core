(function() {
  'use strict';

  angular
    .module('groceries-to-gos')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('groceries-to-gos', {
        abstract: true,
        url: '/groceries-to-gos',
        template: '<ui-view/>'
      })
      .state('groceries-to-gos.list', {
        url: '',
        templateUrl: 'modules/groceries-to-gos/client/views/list-groceries-to-gos.html',
        controller: 'GroceriesToGosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Groceries to gos List'
        }
      })
      .state('groceries-to-gos.create', {
        url: '/create',
        templateUrl: 'modules/groceries-to-gos/client/views/form-groceries-to-go.html',
        controller: 'GroceriesToGosController',
        controllerAs: 'vm',
        resolve: {
          groceries-to-goResolve: newGroceriesToGo
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Groceries to gos Create'
        }
      })
      .state('groceries-to-gos.edit', {
        url: '/:groceriesToGoId/edit',
        templateUrl: 'modules/groceries-to-gos/client/views/form-groceries-to-go.html',
        controller: 'GroceriesToGosController',
        controllerAs: 'vm',
        resolve: {
          groceries-to-goResolve: getGroceriesToGo
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Groceries to go {{ groceries-to-goResolve.name }}'
        }
      })
      .state('groceries-to-gos.view', {
        url: '/:groceriesToGoId',
        templateUrl: 'modules/groceries-to-gos/client/views/view-groceries-to-go.html',
        controller: 'GroceriesToGosController',
        controllerAs: 'vm',
        resolve: {
          groceries-to-goResolve: getGroceriesToGo
        },
        data: {
          pageTitle: 'Groceries to go {{ groceries-to-goResolve.name }}'
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
