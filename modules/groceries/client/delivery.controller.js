(function () {
  'use strict';

  angular
    .module('groceries')
    .controller('DeliveryController', DeliveryController);

  DeliveryController.$inject = ['OrdersService', '$stateParams'];

  function DeliveryController(OrdersService, $stateParams) {
    let vm = this;

    vm.orders = OrdersService.query();
    vm.clientid = $stateParams.clientId;
    vm.getAddress = getAddress;

    console.log(vm.orders);


    function getAddress(address) {
      console.log(address);
      return address.street + ', ' + address.city + ', ' + address.state + ' ' + address.zipcode;
    }
  }
}());
