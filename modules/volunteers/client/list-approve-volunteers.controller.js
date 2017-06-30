(function () {
  'use strict';

  angular
    .module('volunteers')
    .controller('ApproveVolunteersController', ApproveVolunteersController);

  ApproveVolunteersController.$inject = ['$filter', '$window', 'Notification', 'AdminService'];

  function ApproveVolunteersController($filter, $window, Notification, AdminService) {
    var vm = this;

    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.approve = approve;
    vm.remove = remove;
    vm.isContextUserSelf = isContextUserSelf;

    AdminService.query({
      roles: 'volunteer',
      active: false
    }, function(data) {
      vm.users = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.users, {
        roles: 'volunteer',
        active: false
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }

    function approve(user, index) {
      user.active = true;

      user.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        vm.users.splice(((vm.currentPage - 1) * vm.itemsPerPage) + index, 1);
        vm.figureOutItemsToDisplay();
        Notification.info({ message: 'Update successful!' });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
        user.active = false;
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
      return vm.user.email === vm.authentication.user.email;
    }
  }
}());
