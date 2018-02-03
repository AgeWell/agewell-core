(function() {
  'use strict';

  angular
    .module('rides')
    .controller('RideAssignController', RideAssignController);

  RideAssignController.$inject = ['$scope', '$state', '$filter', '$uibModal', 'Notification', 'coreService', 'RidesService'];

  function RideAssignController($scope, $state, $filter, $uibModal, Notification, coreService, RidesService) {
    var vm = this;

    vm.volunteers = coreService.getOptions('volunteers');

    vm.assign = assign;

    RidesService.query({
      status: 'requested'
    }, function(data) {
      vm.rides = data;
    });

    function updateRide() {
      vm.current.$update(successCallback, errorCallback);

      function successCallback(res) {
        Notification.info({
          message: 'Update successful!'
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    // Assign an order to a volunteer.
    function assign(ride) {
      vm.current = ride;

      if (typeof vm.current.assignedTo === 'object') {
        vm.assignedTo = vm.current.assignedTo._id;
      }

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/modules/groceries/client/views/modals/assign.html',
        scope: $scope
      });

      vm.modalOk = function() {
        modalInstance.close('OK Clicked');

        vm.current.assignedTo = vm.assignedTo;
        vm.current.status = 'assigned';

        updateRide()
          .then(successCallback)
          .catch(errorCallback);

        function successCallback(res) {
          Notification.info({
            message: 'Update successful!'
          });
          vm.current.assignedTo = $filter('filter')(vm.volunteers, { _id: vm.assignedTo })[0];
          vm.rides = vm.rides.filter(ride => vm.current._id !== ride._id);
          delete vm.current;
        }

        function errorCallback(res) {
          vm.current.status = 'pending';
          vm.error = res.data.message;
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
  }
}());
