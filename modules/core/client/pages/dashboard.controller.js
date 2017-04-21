(function () {
  'use strict';

  angular
    .module('core')
    .controller('DashboardController', DashboardController);

  function DashboardController() {
    var vm = this;
    vm.orders = [];

    for (var i = 0; i < 5; i++) {
      vm.orders.push({
        clientId: i,
        orderId: i,
        requestNumber: '# ' + i,
        name: 'Jane Doe',
        status: 'Active'
      });
    }
  }
}());
