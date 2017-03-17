(function () {
  'use strict';

  angular
    .module('services.admin')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.services', {
        abstract: true,
        url: '/services',
        template: '<ui-view/>'
      })
      .state('admin.services.list', {
        url: '',
        templateUrl: '/modules/services/client/admin/views/list-services.html',
        controller: 'RequestsAdminListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Requests List'
        }
      })
      .state('admin.services.create', {
        url: '/create',
        templateUrl: '/modules/services/client/admin/views/edit-service.html',
        controller: 'RequestsAdminController',
        controllerAs: 'vm',
        resolve: {
          serviceResolve: newService
        },
        data: {
          pageTitle: 'Requests Create'
        }
      })
      .state('admin.services.edit', {
        url: '/:serviceId/edit',
        templateUrl: '/modules/services/client/admin/views/edit-service.html',
        controller: 'RequestsAdminController',
        controllerAs: 'vm',
        resolve: {
          serviceResolve: getService
        },
        data: {
          pageTitle: 'Edit Service {{ serviceResolve.name }}'
        }
      })
      .state('admin.services.view', {
        url: '/:serviceId',
        templateUrl: '/modules/services/client/admin/views/view-service.html',
        controller: 'RequestsAdminController',
        controllerAs: 'vm',
        resolve: {
          serviceResolve: getService
        },
        data: {
          pageTitle: 'Service {{ serviceResolve.name }}'
        }
      });

    getService.$inject = ['$stateParams', 'RequestsAdminService'];

    function getService($stateParams, RequestsAdminService) {
      return RequestsAdminService.get({
        serviceId: $stateParams.serviceId
      }).$promise;
    }

    newService.$inject = ['RequestsAdminService'];

    function newService(RequestsAdminService) {
      return new RequestsAdminService();
    }
  }
}());
