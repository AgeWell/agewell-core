(function () {
  'use strict';

  angular
    .module('core')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', '$state', '$window', 'Authentication', 'Notification', 'coreService', 'ClientsService'];

  function DashboardController($scope, $state, $window, Authentication, Notification, coreService, ClientsService) {
    var vm = this;
    vm.options = coreService.getOptions('Order');
    vm.callList = [];
    vm.orders = [];

    console.log(vm);

    vm.dates = {
      now: new Date(),
      orderBy: new Date(vm.options.order[0]),
      nextOrderBy: new Date(vm.options.order[1]),
      delivery: new Date(vm.options.delivery[0]),
      nextDelivery: new Date(vm.options.delivery[1])
    };

    vm.clients = ClientsService.query({
      active: true,
      groceryCallList: true
      // lastSkip: vm.dates.orderBy
    });

    for (var i = 0; i < 5; i++) {
      vm.callList.push({
        _id: i,
        orderID: i,
        name: 'Jane Doe',
        homePhone: '555-555-5555'
      });
    }

    for (var j = 0; j < 5; j++) {
      vm.orders.push({
        clientId: j,
        orderId: j,
        requestNumber: '# ' + j,
        name: 'Jane Doe',
        status: 'Active'
      });
    }
  }
}());
