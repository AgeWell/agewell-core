(function () {
  'use strict';

  angular
    .module('clients')
    .controller('ClientsListController', ClientsListController);

  ClientsListController.$inject = ['$filter', '$state', 'Notification', 'coreService', 'ClientsService'];

  function ClientsListController($filter, $state, Notification, coreService, ClientsService) {
    var vm = this;

    vm.options = coreService.getOptions('Order');
    vm.toggle = toggle;
    vm.newOrder = newOrder;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    ClientsService.query(function (data) {
      vm.clients = data;
      vm.buildPager();
    });

    function toggle(field, client) {
      client[field] = !client[field];

      client.$update(successCallback, errorCallback);

      function successCallback(res) {
        Notification.info({ message: 'Update successful!' });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
        client[field] = !client[field];
      }
    }

    function newOrder(client) {
      if (client.lastOrdered === vm.options.order[0]) {
        $state.go('order.edit', { clientId: client.id, orderId: client.lastOrder });
      } else {
        $state.go('order.create', { clientId: client.id });
      }
    }

    // Pager Functions
    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.clients, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }
}());
