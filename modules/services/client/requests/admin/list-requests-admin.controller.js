(function () {
  'use strict';

  angular
    .module('requests.admin')
    .controller('RequestsAdminListController', RequestsAdminListController);

  RequestsAdminListController.$inject = ['$scope', '$filter', 'RequestsAdminService'];

  function RequestsAdminListController($scope, $filter, RequestsAdminService) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    RequestsAdminService.query(function (data) {
      vm.requests = data;
      vm.buildPager();
    });

    console.log(vm);

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 15;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.requests, {
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
