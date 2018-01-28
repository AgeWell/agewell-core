(function() {
  'use strict';

  angular
    .module('rides')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('rides', {
        abstract: true,
        url: '/rides',
        template: '<ui-view/>'
      })
      .state('rides.assign', {
        url: '/assign',
        templateUrl: '/modules/rides/client/views/assign.html',
        controller: 'AssignController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Rides - Assign'
        }
      })
      .state('rides.list', {
        url: '/list',
        templateUrl: '/modules/rides/client/views/list.html',
        controller: 'CheckoutController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Rides - List'
        }
      })
      .state('rides.completed', {
        url: '/completed',
        templateUrl: '/modules/rides/client/views/completed.html',
        controller: 'CompletedController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Rides - Completed'
        }
      });
  }

  getRides.$inject = ['$stateParams', 'RidesService'];

  function getRides($stateParams, RidesService) {
    return RidesService.get({
      rideId: $stateParams.rideId
    }).$promise;
  }

  newRides.$inject = ['RidesService'];

  function newRides(RidesService) {
    return new RidesService();
  }
}());
