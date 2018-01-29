(function() {
  'use strict';

  angular
    .module('rides')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('ride', {
        abstract: true,
        url: '/rides',
        template: '<ui-view/>'
      })
      .state('ride.create', {
        url: '/create',
        params: {
          lastOrder: null
        },
        templateUrl: '/modules/rides/client/views/form-ride.html',
        controller: 'RidesFormController',
        controllerAs: 'vm',
        resolve: {
          orderResolve: newRide
        },
        data: {
          roles: ['admin'],
          pageTitle: 'New Ride'
        }
      })
      .state('ride.edit', {
        url: '/:rideId/edit',
        templateUrl: '/modules/rides/client/views/form-ride.html',
        controller: 'RidesFormController',
        controllerAs: 'vm',
        resolve: {
          orderResolve: getRide
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit Ride'
        }
      })
      .state('ride.view', {
        url: '/:rideId',
        templateUrl: '/modules/rides/client/views/view-ride.html',
        controller: 'RideViewController',
        controllerAs: 'vm',
        resolve: {
          orderResolve: getRide
        },
        data: {
          pageTitle: 'Ride'
        }
      })
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
      // })
      // .state('rides.list', {
      //   url: '/list',
      //   templateUrl: '/modules/rides/client/views/list.html',
      //   controller: 'CheckoutController',
      //   controllerAs: 'vm',
      //   data: {
      //     pageTitle: 'Rides - List'
      //   }
      // })
      // .state('rides.completed', {
      //   url: '/completed',
      //   templateUrl: '/modules/rides/client/views/completed.html',
      //   controller: 'CompletedController',
      //   controllerAs: 'vm',
      //   data: {
      //     pageTitle: 'Rides - Completed'
      //   }
      });
  }

  getRide.$inject = ['$stateParams', 'RidesService'];

  function getRide($stateParams, RidesService) {
    return RidesService.get({
      rideId: $stateParams.rideId
    }).$promise;
  }

  newRide.$inject = ['RidesService'];

  function newRide(RidesService) {
    return new RidesService();
  }

  getRides.$inject = ['$stateParams', 'RidesService'];

  function getRides($stateParams, RidesService) {
    return RidesService.get({
      rideId: $stateParams.rideId
    }).$promise;
  }
}());
