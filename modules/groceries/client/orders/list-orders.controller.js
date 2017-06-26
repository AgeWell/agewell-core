(function () {
  'use strict';

  angular
    .module('groceries.orders')
    .controller('OrdersListController', OrdersListController);

  OrdersListController.$inject = ['OrdersService', '$filter', '$stateParams'];

  function OrdersListController(OrdersService, $filter, $stateParams) {
    var vm = this;

    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    vm.clientid = $stateParams.clientId;

    OrdersService.query(function (data) {
      vm.orders = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 3;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = vm.orders;
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
