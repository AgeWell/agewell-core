(function () {
  'use strict';

  angular
    .module('groceries')
    .controller('CheckoutController', CheckoutController);

  CheckoutController.$inject = ['OrdersService', '$stateParams'];

  function CheckoutController(OrdersService, $stateParams) {
    let vm = this;

    vm.orders = OrdersService.query({
      status: 'incart'
    }, function(orders) {
      console.log(orders);
    });

    vm.clientid = $stateParams.clientId;
  }
}());
