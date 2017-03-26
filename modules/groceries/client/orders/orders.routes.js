(function() {
  'use strict';

  angular
    .module('groceries.orders')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('groceries.orders', {
        abstract: true,
        url: '/orders',
        template: '<ui-view/>'
      })
      .state('groceries.orders.list', {
        url: '',
        templateUrl: '/modules/groceries/client/views/list-orders.html',
        controller: 'OrdersListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Groceries To Go Orders List'
        }
      })
      .state('groceries.orders.create', {
        url: '/create',
        templateUrl: '/modules/groceries/client/views/form-order.html',
        controller: 'OrdersController',
        controllerAs: 'vm',
        resolve: {
          orderResolve: newOrder
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Groceries To Go Order'
        }
      })
      .state('groceries.orders.edit', {
        url: '/:orderId/edit',
        templateUrl: '/modules/groceries/client/views/form-order.html',
        controller: 'OrdersController',
        controllerAs: 'vm',
        resolve: {
          orderResolve: getOrder
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Groceries To Go Order'
        }
      })
      .state('groceries.orders.view', {
        url: '/:orderId',
        templateUrl: '/modules/groceries/client/views/view-order.html',
        controller: 'OrdersController',
        controllerAs: 'vm',
        resolve: {
          orderResolve: getOrder
        },
        data: {
          pageTitle: 'Groceries To Go Order'
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
