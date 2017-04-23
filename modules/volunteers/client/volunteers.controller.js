(function() {
  'use strict';

  // Volunteers controller
  angular
    .module('volunteers')
    .controller('VolunteersController', VolunteersController);

  VolunteersController.$inject = ['$scope', '$state', '$stateParams', '$window', 'Authentication', 'coreService', 'volunteerResolve'];

  function VolunteersController($scope, $state, $stateParams, $window, Authentication, coreService, volunteer) {
    var vm = this;

    vm.authentication = Authentication;
    vm.volunteer = volunteer;
    vm.options = coreService.getOptions('Volunteer');
    vm.remove = remove;
    vm.save = save;

    vm.editProfile = $stateParams.editProfile || false;

    if (vm.editProfile) {
      vm.volunteer.contact = {
        name: {
          first: Authentication.user.firstName,
          last: Authentication.user.lastName
        },
        email: Authentication.user.email
      };
    }

    console.log(vm);

    // Remove existing Volunteer
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.volunteer.$remove($state.go('volunteers.list'));
      }
    }

    // Save Volunteer
    function save(isValid) {
      if (!isValid) {
        console.log(vm);

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
