(function() {
  'use strict';

  angular
    .module('requests')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('services.view.requests', {
        abstract: true,
        url: '/requests',
        template: '<ui-view/>'
      })
      .state('services.view.requests.list', {
        url: '',
        templateUrl: '/modules/requests/client/views/list-requests.html',
        controller: 'RequestsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Requests List'
        }
      })
      .state('services.view.requests.create', {
        url: '/:serviceId/request',
        templateUrl: '/modules/requests/client/views/form-request.html',
        controller: 'RequestsController',
        controllerAs: 'vm',
        resolve: {
          requestResolve: newRequest,
          requestService: getService
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Requests Create'
        }
      })
      .state('services.view.requests.edit', {
        url: '/:requestId/edit',
        templateUrl: '/modules/requests/client/views/form-request.html',
        controller: 'RequestsController',
        controllerAs: 'vm',
        resolve: {
          requestResolve: getRequest,
          requestService: getService
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Request {{ requestResolve.name }}'
        }
      })
      .state('services.view.requests.view', {
        url: '/:requestId',
        templateUrl: '/modules/requests/client/views/view-request.html',
        controller: 'RequestsController',
        controllerAs: 'vm',
        resolve: {
          requestResolve: getRequest,
          requestService: getService
        },
        data: {
          pageTitle: 'Request {{ requestResolve.name }}'
        }
      });
  }

  getRequest.$inject = ['$stateParams', 'RequestsService'];

  function getRequest($stateParams, RequestsService) {
    return RequestsService.get({
      requestId: $stateParams.requestId
    }).$promise;
  }

  newRequest.$inject = ['RequestsService'];

  function newRequest(RequestsService) {
    return new RequestsService();
  }

  getService.$inject = ['$stateParams', 'ServicesService'];

  function getService($stateParams, ServicesService) {
    if ($stateParams.serviceId) {
      return ServicesService.get({
        requestId: $stateParams.serviceId
      }).$promise;
    }
    return null;
  }
}());
