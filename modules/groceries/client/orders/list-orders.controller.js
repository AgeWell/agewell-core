(function () {
  'use strict';

  angular
    .module('groceries.orders')
    .controller('OrdersListController', OrdersListController);

  OrdersListController.$inject = ['OrdersService'];

  function OrdersListController(OrdersService) {
    let vm = this;

    vm.orders = OrdersService.query();
  }
}());
