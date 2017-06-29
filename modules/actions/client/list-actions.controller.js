(function() {
  'use strict';

  angular
    .module('actions')
    .controller('ActionsListController', ActionsListController);

  ActionsListController.$inject = ['$filter', '$stateParams', 'ActionsService'];

  function ActionsListController($filter, $stateParams, ActionsService) {
    var vm = this;

    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    ActionsService.query({
      clientId: $stateParams.clientId
    }, function(data) {
      vm.actions = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 3;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = vm.actions;
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
