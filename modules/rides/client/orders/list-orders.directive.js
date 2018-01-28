(function () {
  'use strict';

  angular
    .module('rides.orders')
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
      templateUrl: '/modules/rides/client/views/list-orders.html'
    };

    return directive;
  }
}());
