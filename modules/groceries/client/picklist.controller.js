(function () {
  'use strict';

  angular
    .module('groceries')
    .controller('PicklistController', PicklistController);

  PicklistController.$inject = ['OrdersService', '$stateParams'];

  function PicklistController(OrdersService, $stateParams) {
    let vm = this;

    vm.orders = OrdersService.query({
      status: 'ordered'
    // }, function(data) {
    //   vm.picklist = data;
    });

    console.log(vm);
  }
}());
