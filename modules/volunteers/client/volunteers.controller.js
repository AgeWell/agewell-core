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

    if (!vm.volunteer._id) {
      vm.volunteer.contact = {
        address: {
          state: 'MN'
        }
      };
    }

    if (vm.editProfile) {
      vm.volunteer.contact.firstName = Authentication.user.firstName;
      vm.volunteer.contact.lastName = Authentication.user.lastName;
      vm.volunteer.contact.email = Authentication.user.email;
    }

    // Remove existing Volunteer
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.volunteer.$remove($state.go('volunteers.list'));
      }
    }

    // Save Volunteer
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.volunteerForm');
        return false;
      }

      vm.volunteer.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

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
