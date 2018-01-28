(function () {
  'use strict';

  // Rides controller
  angular
    .module('rides')
    .controller('RidesController', RidesController);

  RidesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'coreService', 'rideResolve'];

  function RidesController ($scope, $state, $window, Authentication, coreService, ride) {
    var vm = this;

    vm.authentication = Authentication;
    vm.ride = ride;
    vm.options = coreService.getOptions('Client');
    vm.error = null;
    vm.remove = remove;
    vm.save = save;

    // Remove existing Rides to go
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.ride.$remove($state.go('rides.list'));
      }
    }

    // Save Rides to go
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.rideForm');
        return false;
      }

      vm.ride.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('rides.view', {
          rideId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
