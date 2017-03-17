(function () {
  'use strict';

  angular
    .module('clients')
    .controller('ClientsListController', ClientsListController);

  ClientsListController.$inject = ['$filter', 'ClientsService'];

  function ClientsListController($filter, ClientsService) {
    var vm = this;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;

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

    console.log(vm);
  }
}());
