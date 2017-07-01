(function () {
  'use strict';

  angular
    .module('volunteers')
    .controller('VolunteersListController', VolunteersListController);

  VolunteersListController.$inject = ['$filter', 'Notification', 'VolunteersService'];

  function VolunteersListController($filter, Notification, VolunteersService) {
    var vm = this;

    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.toggle = toggle;

    VolunteersService.query(function (data) {
      vm.volunteers = data;
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
      vm.filteredItems = $filter('filter')(vm.volunteers, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      if (vm.search !== '' && vm.filterLength < (vm.itemsPerPage * (vm.currentPage - 1))) {
        vm.currentPage = 1;
      }
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }

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
  }
}());
