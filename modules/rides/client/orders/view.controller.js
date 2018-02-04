(function() {
  'use strict';

  // Rides controller
  angular
    .module('rides')
    .controller('RideViewController', RideViewController);

  RideViewController.$inject = ['$scope', '$state', '$filter', '$stateParams', '$window', '$uibModal', 'RidesService', 'Authentication', 'Notification', 'coreService', 'rideResolve'];

  function RideViewController($scope, $state, $filter, $stateParams, $window, $uibModal, RidesService, Authentication, Notification, coreService, ride) {
    var vm = this;

    vm.lastOrder = '';
    vm.authentication = Authentication;
    vm.ride = ride;
    vm.options = coreService.getOptions('Ride');
    vm.volunteers = coreService.getOptions('volunteers');
    vm.assign = assign;
    vm.error = null;
    vm.print = print;
    vm.canEdit = vm.authentication.user.roles.includes('admin');

    vm.volunteer = vm.volunteers.find(item => item._id === vm.ride.assignedTo);

    function print() {
      window.print();
    }

    // Assign an order to a volunteer.
    function assign() {
      if (vm.ride.assignedTo) {
        vm.assignedTo = vm.ride.assignedTo;
      }

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/modules/rides/client/views/modals/assign.html',
        scope: $scope
      });

      vm.modalOk = function() {
        modalInstance.close('OK Clicked');

        vm.ride.assignedTo = vm.assignedTo;
        vm.ride.status = 'assigned';

        vm.ride.createOrUpdate()
          .then(successCallback)
          .catch(errorCallback);

        function successCallback(res) {
          Notification.info({
            message: 'Update successful!'
          });

          vm.ride.assignedTo = $filter('filter')(vm.volunteers, { _id: vm.assignedTo })[0];
          vm.volunteer = vm.volunteers.find(item => item._id === vm.ride.assignedTo);

        }

        function errorCallback(res) {
          vm.ride.status = 'pending';
        }
      };

      vm.modalCancel = function() {
        modalInstance.dismiss('Cancel Clicked');
      };

      modalInstance.result.then(function() {
        console.log('Open Checkout Interface');
      }, function() {
        console.info('modal-component dismissed at: ' + new Date());
      });
    }

    // Listeners
    $scope.$on('updateOrder', function() {
      vm.update();
    });
  }
}());
