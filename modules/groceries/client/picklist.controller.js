(function () {
  'use strict';

  angular
    .module('groceries')
    .controller('PicklistController', PicklistController);

  PicklistController.$inject = ['OrdersService', '$stateParams'];

  function PicklistController(OrdersService, $stateParams) {
    let vm = this;

    vm.toggle = toggle;

    vm.orders = OrdersService.query({
      status: 'ordered'
    // }, function(data) {
    //   vm.picklist = data;
    });

    function toggle(order, itemId) {
      console.log('client', order);
      order.items[itemId].inCart = !order.items[itemId].inCart;

      order.$cart(successCallback, errorCallback);

      function successCallback(res) {
        console.log(res);
        console.log(order);
        Notification.info({ message: 'Update successful!' });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
        order.items[itemId].inCart = !order.items[itemId].inCart;
      }
    }

    console.log(vm);
  }
}());
