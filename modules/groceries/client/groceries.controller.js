(function () {
  'use strict';

  // Groceries to gos controller
  angular
    .module('groceries')
    .controller('GroceriesController', GroceriesController);

  GroceriesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'coreService', 'groceriesToGoResolve'];

  function GroceriesController ($scope, $state, $window, Authentication, coreService, groceriesToGo) {
    var vm = this;

    vm.authentication = Authentication;
    vm.groceriesToGo = groceriesToGo;
    vm.options = coreService.getOptions('Client');
    vm.error = null;
    vm.remove = remove;
    vm.save = save;

    // Remove existing Groceries to go
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.groceriesToGo.$remove($state.go('groceries.list'));
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
        $state.go('groceries.view', {
          groceriesToGoId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
