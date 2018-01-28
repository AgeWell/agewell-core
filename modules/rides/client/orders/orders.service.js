// Rides service used to communicate Rides REST endpoints
(function () {
  'use strict';

  angular
    .module('rides.orders')
    .factory('OrdersService', OrdersService);

  OrdersService.$inject = ['$log', '$resource'];

  function OrdersService($log, $resource) {
    var Order = $resource('/api/orders/:orderId', {
      orderId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Order.prototype, {
      createOrUpdate: function () {
        var order = this;
        return createOrUpdate(order);
      }
    });

    return Order;

    function createOrUpdate(order) {
      if (order._id) {
        return order.$update(onSuccess, onError);
      } else {
        order.date = new Date();
        return order.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(order) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
