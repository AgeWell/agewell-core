(function () {
  'use strict';

  angular
    .module('services.admin')
    .controller('ServicesAdminListController', ServicesAdminListController);

  ServicesAdminListController.$inject = ['$scope', '$filter', 'ServicesAdminService'];

  function ServicesAdminListController($scope, $filter, ServicesAdminService) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    ServicesAdminService.query(function (data) {
      vm.services = data;
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
      vm.filteredItems = $filter('filter')(vm.services, {
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
