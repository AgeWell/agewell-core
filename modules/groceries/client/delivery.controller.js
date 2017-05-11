(function () {
  'use strict';

  angular
    .module('groceries')
    .controller('DeliveryController', DeliveryController);

  DeliveryController.$inject = ['OrdersService', '$stateParams', '$window'];

  function DeliveryController(OrdersService, $stateParams, $window) {
    let vm = this;

    vm.orders = OrdersService.query();
    vm.clientid = $stateParams.clientId;
    vm.getAddress = getAddress;
    vm.isMobile = false;

    if ($window.innerWidth < 992) {
      vm.isMobile = true;
    }

    console.log($window.innerWidth);

    console.log(vm.orders);


    function getAddress(address) {
      // console.log(address);
      return address.street + ', ' + address.city + ', ' + address.state + ' ' + address.zipcode;
    }
  }
}());
