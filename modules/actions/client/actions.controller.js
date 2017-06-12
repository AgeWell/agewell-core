(function () {
  'use strict';

  // Actions to gos controller
  angular
    .module('actions')
    .controller('ActionsController', ActionsController);

  ActionsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'coreService', 'actionsToGoResolve'];

  function ActionsController ($scope, $state, $window, Authentication, coreService, actionsToGo) {
    var vm = this;

    vm.authentication = Authentication;
    vm.actionsToGo = actionsToGo;
    vm.options = coreService.getOptions('Client');
    vm.error = null;
    vm.remove = remove;
    vm.save = save;

    // Remove existing Actions to go
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.actionsToGo.$remove($state.go('actions.list'));
      }
    }

    // Save Actions to go
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.actionsToGoForm');
        return false;
      }

      // TODO: move create/update logic to service
      vm.actionsToGo.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('actions.view', {
          actionsToGoId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
