(function() {
  'use strict';

  angular
    .module('core')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', '$state', '$window', '$filter', 'Authentication', 'Notification', 'coreService', 'ClientsService'];

  function DashboardController($scope, $state, $window, $filter, Authentication, Notification, coreService, ClientsService) {
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

    ClientsService.query({
      active: true,
      groceryCallList: true,
      skip: vm.dates.orderBy
    }, function(data) {
      vm.callList = data;
      buildPager('CallList');
    });

    for (var j = 0; j < 5; j++) {
      vm.orders.push({
        clientId: j,
        orderId: j,
        requestNumber: '# ' + j,
        name: 'Jane Doe',
        status: 'Active'
      });
    }

    // Pages related functions
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.itemsPerPage = 6;

    function buildPager(type) {
      vm['paged' + type] = [];
      vm[type + 'Page'] = 1;
      vm.figureOutItemsToDisplay(type);
    }

    function figureOutItemsToDisplay(type) {
      vm['filtered' + type] = $filter('filter')(vm.callList, {
        $: vm.search
      });
      vm['filter' + type + 'Length'] = vm['filtered' + type].length;
      var begin = ((vm[type + 'Page'] - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      console.log(begin, end);
      console.log(vm['paged' + type]);
      vm['paged' + type] = vm['filtered' + type].slice(begin, end);
    }

    function pageChanged(type) {
      vm.figureOutItemsToDisplay(type);
    }
  }
}());
