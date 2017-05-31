(function() {
  'use strict';

  angular
    .module('actions')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('actions', {
        abstract: true,
        url: '/actions',
        template: '<ui-view/>'
      })
      .state('actions.create', {
        url: '/order',
        templateUrl: 'modules/actions/client/views/form-order.html',
        controller: 'ActionsController',
        controllerAs: 'vm',
        resolve: {
          actionsResolve: newActionsToGo
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Actions Create'
        }
      })
      .state('actions.edit', {
        url: '/:orderId/edit',
        templateUrl: 'modules/actions/client/views/form-order.html',
        controller: 'ActionsController',
        controllerAs: 'vm',
        resolve: {
          actionsResolve: getActionsToGo
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Actions {{ actionsResolve.name }}'
        }
      })
      .state('actions.view', {
        url: '/:orderId',
        templateUrl: 'modules/actions/client/views/view-order.html',
        controller: 'ActionsController',
        controllerAs: 'vm',
        resolve: {
          actionsResolve: getActionsToGo
        },
        data: {
          pageTitle: 'Actions {{ actionsResolve.name }}'
        }
      });
  }

  getActionsToGo.$inject = ['$stateParams', 'ActionsService'];

  function getActionsToGo($stateParams, ActionsService) {
    return ActionsService.get({
      actionsToGoId: $stateParams.actionsToGoId
    }).$promise;
  }

  newActionsToGo.$inject = ['ActionsService'];

  function newActionsToGo(ActionsService) {
    return new ActionsService();
  }
}());
