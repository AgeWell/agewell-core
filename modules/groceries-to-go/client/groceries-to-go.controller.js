(function () {
  'use strict';

  // Groceries to gos controller
  angular
    .module('groceriesToGo')
    .controller('GroceriesToGosController', GroceriesToGosController);

  GroceriesToGosController.$inject = ['$scope', '$state', '$window', 'Authentication', 'groceriesToGoResolve'];

  function GroceriesToGosController ($scope, $state, $window, Authentication, groceriesToGo) {
    let vm = this;

    vm.authentication = Authentication;
    vm.groceriesToGo = groceriesToGo;
    vm.error = null;
    vm.remove = remove;
    vm.save = save;

    // Remove existing Groceries to go
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.groceriesToGo.$remove($state.go('groceries-to-go.list'));
      }
    }

    // Save Groceries to go
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.groceriesToGoForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.groceriesToGo._id) {
        vm.groceriesToGo.$update(successCallback, errorCallback);
      } else {
        vm.groceriesToGo.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('groceries-to-go.view', {
          groceriesToGoId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
