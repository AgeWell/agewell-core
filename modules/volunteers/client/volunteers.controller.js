(function () {
  'use strict';

  // Volunteers controller
  angular
    .module('volunteers')
    .controller('VolunteersController', VolunteersController);

  VolunteersController.$inject = ['$scope', '$state', '$window', 'Authentication', 'volunteerResolve'];

  function VolunteersController ($scope, $state, $window, Authentication, volunteer) {
    var vm = this;

    vm.authentication = Authentication;
    vm.volunteer = volunteer;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Volunteer
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.volunteer.$remove($state.go('volunteers.list'));
      }
    }

    // Save Volunteer
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.volunteerForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.volunteer._id) {
        vm.volunteer.$update(successCallback, errorCallback);
      } else {
        vm.volunteer.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('volunteers.view', {
          volunteerId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
