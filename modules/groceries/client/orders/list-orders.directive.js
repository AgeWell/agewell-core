(function () {
  'use strict';

  angular
    .module('groceries.orders')
    .directive('listOrders', listOrders);

  function listOrders() {
    var directive = {
      restrict: 'E',
      scope: {
        clientId: '='
      },
      controller: 'OrdersListController',
      controllerAs: 'vm',
      bindToController: true,
      replace: true,
      transclude: true,
      templateUrl: '/modules/groceries/client/views/list-orders.html'
    };

    return directive;
  }
}());
