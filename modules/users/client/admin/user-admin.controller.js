(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserController', UserController);

  UserController.$inject = ['$scope', '$state', '$stateParams', '$window', 'Authentication', 'userResolve', 'Notification'];

  function UserController($scope, $state, $stateParams, $window, Authentication, user, Notification) {
    var vm = this;

    vm.title = $stateParams.pageTitle;
    vm.authentication = Authentication;
    vm.user = user;
    vm.remove = remove;
    vm.update = update;
    vm.isContextUserSelf = isContextUserSelf;

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

    function update(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      vm.user.$update(successCallback, errorCallback);

      function successCallback(res) {
        $state.go('admin.users.view', {
          userId: vm.user._id
        });
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> User saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> User update error!' });
      }
    }

    function isContextUserSelf() {
      return vm.user.email === vm.authentication.user.email;
    }
  }
}());
