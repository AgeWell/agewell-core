(function() {
  'use strict';

  angular
    .module('groceries-to-go')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('groceries-to-go', {
        abstract: true,
        url: '/groceries-to-go',
        template: '<ui-view/>'
      })
      .state('groceries-to-go.list', {
        url: '',
        templateUrl: 'modules/groceries-to-go/client/views/list-groceries-to-go.html',
        controller: 'GroceriesToGosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Groceries to gos List'
        }
      })
      .state('groceries-to-go.create', {
        url: '/create',
        templateUrl: 'modules/groceries-to-go/client/views/form-groceries-to-go.html',
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
      .state('groceries-to-go.edit', {
        url: '/:groceriesToGoId/edit',
        templateUrl: 'modules/groceries-to-go/client/views/form-groceries-to-go.html',
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
      .state('groceries-to-go.view', {
        url: '/:groceriesToGoId',
        templateUrl: 'modules/groceries-to-go/client/views/view-groceries-to-go.html',
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
