(function () {
  'use strict';

  angular
    .module('requests.admin')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.requests', {
        abstract: true,
        url: '/requests',
        template: '<ui-view/>'
      })
      .state('admin.requests.list', {
        url: '',
        templateUrl: '/modules/requests/client/admin/views/list-requests.html',
        controller: 'RequestsAdminListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Requests List'
        }
      })
      .state('admin.requests.create', {
        url: '/create',
        templateUrl: '/modules/requests/client/admin/views/edit-request.html',
        controller: 'RequestsAdminController',
        controllerAs: 'vm',
        resolve: {
          serviceResolve: newRequest
        },
        data: {
          pageTitle: 'Requests Create'
        }
      })
      .state('admin.requests.edit', {
        url: '/:serviceId/edit',
        templateUrl: '/modules/requests/client/admin/views/edit-request.html',
        controller: 'RequestsAdminController',
        controllerAs: 'vm',
        resolve: {
          serviceResolve: getRequest
        },
        data: {
          pageTitle: 'Edit Service {{ serviceResolve.name }}'
        }
      })
      .state('admin.requests.view', {
        url: '/:serviceId',
        templateUrl: '/modules/requests/client/admin/views/view-request.html',
        controller: 'RequestsAdminController',
        controllerAs: 'vm',
        resolve: {
          serviceResolve: getRequest
        },
        data: {
          pageTitle: 'Service {{ serviceResolve.name }}'
        }
      });

    getRequest.$inject = ['$stateParams', 'RequestsAdminService'];

    function getRequest($stateParams, RequestsAdminService) {
      return RequestsAdminService.get({
        serviceId: $stateParams.serviceId
      }).$promise;
    }

    newRequest.$inject = ['RequestsAdminService'];

    function newRequest(RequestsAdminService) {
      return new RequestsAdminService();
    }
  }
}());
