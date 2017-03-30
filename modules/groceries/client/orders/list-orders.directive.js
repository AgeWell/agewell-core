(function () {
  'use strict';

  angular
    .module('groceries.orders')
    .directive('listOrders', listOrders);

  function listOrders() {
    let directive = {
      restrict: 'E',
      scope: {
        clientId: '='
      },
      controller: 'OrdersListController',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: '/modules/groceries/client/views/list-orders.html'
    };

    return directive;
  }
}());
