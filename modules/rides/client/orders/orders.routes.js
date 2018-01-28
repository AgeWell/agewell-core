(function() {
  'use strict';

  angular
    .module('rides.orders')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('order', {
        abstract: true,
        url: '/clients/:clientId/orders',
        template: '<ui-view/>'
      })
      .state('order.create', {
        url: '/create',
        params: {
          lastOrder: null
        },
        templateUrl: '/modules/rides/client/views/form-order.html',
        controller: 'OrdersController',
        controllerAs: 'vm',
        resolve: {
          orderResolve: newOrder
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Rides Order'
        }
      })
      .state('order.edit', {
        url: '/:orderId/edit',
        templateUrl: '/modules/rides/client/views/form-order.html',
        controller: 'OrdersController',
        controllerAs: 'vm',
        resolve: {
          orderResolve: getOrder
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit Rides Order'
        }
      })
      .state('order.view', {
        url: '/:orderId',
        templateUrl: '/modules/rides/client/views/view-order.html',
        controller: 'OrdersController',
        controllerAs: 'vm',
        resolve: {
          orderResolve: getOrder
        },
        data: {
          pageTitle: 'Rides Order'
        }
      });
  }

  getOrder.$inject = ['$stateParams', 'OrdersService'];

  function getOrder($stateParams, OrdersService) {
    return OrdersService.get({
      orderId: $stateParams.orderId
    }).$promise;
  }

  newOrder.$inject = ['OrdersService'];

  function newOrder(OrdersService) {
    return new OrdersService();
  }
}());
