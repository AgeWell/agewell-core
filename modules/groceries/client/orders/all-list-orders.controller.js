(function() {
  'use strict';

  angular
    .module('groceries.orders')
    .controller('AllOrdersListController', AllOrdersListController);

  AllOrdersListController.$inject = ['$filter', '$stateParams', 'OrdersService'];

  function AllOrdersListController($filter, $stateParams, OrdersService) {
    var vm = this;

    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    vm.clientid = $stateParams.clientId;

    // vm.sortKeys = {
    //   id: 'ASC',
    //   name: 'ASC',
    //   created: 'ASC',
    //   delivered: 'ASC'
    // };

    OrdersService.query({}, function(data) {
      vm.orders = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.search = '';
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.orders, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      if (vm.search !== '' && vm.filterLength < (vm.itemsPerPage * (vm.currentPage - 1))) {
        vm.currentPage = 1;
      }
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }

    // function sortBy(sortKey, direction) {
    //
    // }
  }
}());
