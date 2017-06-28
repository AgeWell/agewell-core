(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserController', UserController);

  UserController.$inject = ['$scope', '$state', '$stateParams', '$window', 'Authentication', 'userResolve', 'Notification', 'coreService'];

  function UserController($scope, $state, $stateParams, $window, Authentication, user, Notification, coreService) {
    var vm = this;

    vm.title = $stateParams.pageTitle;
    vm.authentication = Authentication;
    vm.users = coreService.getOptions('User');
    vm.user = user;
    vm.toggleRole = toggleRole;
    vm.remove = remove;
    vm.update = update;
    vm.isContextUserSelf = isContextUserSelf;

    // Toggle selection for a given fruit by name
    function toggleRole(role) {
      var idx = vm.user.roles.indexOf(role);

      // Is currently selected
      if (idx > -1) {
        vm.user.roles.splice(idx, 1);
      } else {
        // Is newly selected
        vm.user.roles.push(role);
      }
    }

    function update(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      vm.user.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> User saved successfully!' });
        $state.go($state.previous.state.name, $state.previous.params);
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> User update error!' });
      }
    }

    function remove(user) {
      if ($window.confirm('Are you sure you want to delete this user?')) {
        if (user) {
          user.$remove();
          Notification.success('User deleted successfully!');
        } else {
          vm.user.$remove(function () {
            $state.go('admin.users.list');
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> User deleted successfully!' });
          });
        }
      }
    }

    function isContextUserSelf() {
      return vm.user.email === vm.authentication.user.email;
    }
  }
}());
