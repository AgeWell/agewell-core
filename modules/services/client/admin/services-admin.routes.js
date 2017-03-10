(function () {
  'use strict';

  // Setting up route
  angular
    .module('services.admin')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.services', {
        url: '/services',
        templateUrl: '/modules/services/client/admin/views/list-services.html',
        controller: 'ServiceListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Services List'
        }
      })
      .state('admin.service', {
        url: '/services/:serviceId',
        templateUrl: '/modules/services/client/admin/views/view-service.html',
        controller: 'ServiceController',
        controllerAs: 'vm',
        resolve: {
          serviceResolve: getService
        },
        data: {
          pageTitle: 'Edit {{ serviceResolve.displayName }}'
        }
      })
      .state('admin.service-edit', {
        url: '/services/:serviceId/edit',
        templateUrl: '/modules/services/client/admin/views/edit-service.html',
        controller: 'ServiceController',
        controllerAs: 'vm',
        resolve: {
          serviceResolve: getService
        },
        data: {
          pageTitle: 'Edit Service {{ serviceResolve.displayName }}'
        }
      });

    getService.$inject = ['$stateParams', 'AdminService'];

    function getService($stateParams, AdminService) {
      return AdminService.get({
        serviceId: $stateParams.serviceId
      }).$promise;
    }
  }
}());
