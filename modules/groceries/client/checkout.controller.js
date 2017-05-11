(function () {
  'use strict';

  angular
    .module('groceries')
    .controller('CheckoutController', CheckoutController);

  CheckoutController.$inject = ['OrdersService', '$stateParams'];

  function CheckoutController(OrdersService, $stateParams) {
    let vm = this;

    vm.orders = OrdersService.query();
    vm.clientid = $stateParams.clientId;
  }
}());
