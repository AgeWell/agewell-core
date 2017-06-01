(function () {
  'use strict';

  angular
    .module('groceries.orders')
    .controller('OrdersListController', OrdersListController);

  OrdersListController.$inject = ['OrdersService', '$stateParams'];

  function OrdersListController(OrdersService, $stateParams) {
    var vm = this;

    vm.orders = OrdersService.query();
    vm.clientid = $stateParams.clientId;
  }
}());
