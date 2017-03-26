// Groceries to gos service used to communicate Groceries to gos REST endpoints
(function () {
  'use strict';

  angular
    .module('groceries.orders')
    .factory('OrdersService', OrdersService);

  OrdersService.$inject = ['$resource'];

  function OrdersService($resource) {
    return $resource('api/orders/:orderId', {
      orderId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
