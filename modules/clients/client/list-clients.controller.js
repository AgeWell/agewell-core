(function () {
  'use strict';

  angular
    .module('clients')
    .controller('ClientsListController', ClientsListController);

  ClientsListController.$inject = ['$filter', 'Notification', 'ClientsService'];

  function ClientsListController($filter, Notification, ClientsService) {
    var vm = this;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.toggleCallList = toggleCallList;

    vm.clients = ClientsService.query();

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.services, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function toggleCallList() {
      vm.client.groceryCallList = !vm.client.groceryCallList;

      vm.client.$update(successCallback, errorCallback);

      function successCallback(res) {
        console.log(res);
        console.log(vm.client);
        Notification.info({ message: 'Update successful!' });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
        vm.client.groceryCallList = !vm.client.groceryCallList;
      }
    }

    console.log(vm);
  }
}());
