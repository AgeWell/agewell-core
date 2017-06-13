(function () {
  'use strict';

  angular
    .module('volunteers')
    .controller('VolunteersListController', VolunteersListController);

  VolunteersListController.$inject = ['$filter', 'Notification', 'VolunteersService'];

  function VolunteersListController($filter, Notification, VolunteersService) {
    var vm = this;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.toggle = toggle;

    vm.volunteers = VolunteersService.query();
    // TODO: Add pagenation

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.services, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
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
