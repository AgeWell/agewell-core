(function() {
  'use strict';

  angular
    .module('services')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('services', {
        abstract: true,
        url: '/services',
        template: '<ui-view/>'
      })
      .state('services.list', {
        url: '',
        templateUrl: 'modules/services/client/views/list-services.html',
        controller: 'ServicesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Services List'
        }
      })
      .state('services.view', {
        url: '/:serviceId',
        templateUrl: 'modules/services/client/views/view-service.html',
        controller: 'ServicesController',
        controllerAs: 'vm',
        resolve: {
          serviceResolve: getService
        },
        data: {
          pageTitle: 'Service {{ serviceResolve.name }}'
        }
      });
  }

  getService.$inject = ['$stateParams', 'ServicesService'];

  function getService($stateParams, ServicesService) {
    return ServicesService.get({
      serviceId: $stateParams.serviceId
    }).$promise;
  }
}());
