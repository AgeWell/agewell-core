(function() {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserListController', UserListController);

  UserListController.$inject = ['$scope', '$filter', '$window', 'Authentication', 'Notification', 'AdminService'];

  function UserListController($scope, $filter, $window, Authentication, Notification, AdminService) {
    var vm = this;

    vm.toggle = toggle;
    vm.remove = remove;
    vm.isContextUserSelf = isContextUserSelf;
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

    function remove(user) {
      if ($window.confirm('Are you sure you want to delete this user?')) {
        if (user) {
          user.$remove();
          Notification.success('User deleted successfully!');
        } else {
          vm.user.$remove(function () {
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> User deleted successfully!' });
          });
        }
      }
    }

    function isContextUserSelf(user) {
      return user.email === Authentication.user.email;
    }

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.search = '';
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.users, {
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
  }
}());
