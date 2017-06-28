(function() {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserListController', UserListController);

    // TODO: SOrth the users list

  UserListController.$inject = ['$scope', '$filter', 'Notification', 'AdminService'];

  function UserListController($scope, $filter, Notification, AdminService) {
    var vm = this;

    vm.toggle = toggle;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    AdminService.query(function(data) {
      vm.users = data;
      vm.buildPager();
    });

    function toggle(field, user) {
      user[field] = !user[field];

      user.$update(successCallback, errorCallback);

      function successCallback(res) {
        Notification.info({
          message: 'Update successful!'
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
        user[field] = !user[field];
      }
    }

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.users, {
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
