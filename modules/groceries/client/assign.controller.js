(function() {
  'use strict';

  angular
    .module('groceries')
    .controller('AssignController', AssignController);

  AssignController.$inject = ['$scope', '$filter', '$uibModal', 'Notification', 'coreService', 'OrdersService'];

  function AssignController($scope, $filter, $uibModal, Notification, coreService, OrdersService) {
    var vm = this;

    vm.complete = false;
    vm.volunteers = coreService.getOptions('volunteers');
    vm.allowSave = true;

    vm.assign = assign;

    vm.orders = OrdersService.query({
      status: 'pending'
    }, function(orders) { });

    function updateOrder() {
      vm.current.$update(successCallback, errorCallback);

      function successCallback(res) {
        Notification.info({
          message: 'Update successful!'
        });
        // checkList();
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    // function checkList() {
    //   vm.orders = vm.orders.every(function(order) {
    //     return listItem.inCart || listItem.notAvailable;
    //   });
    //
    //   if (vm.complete && vm.orders.length !== 0) {
    //     checkout();
    //   }
    // }

    // Assign an order to a volunteer.
    function assign(order) {
      console.log(order);
      vm.current = order;

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
        vm.current.status = 'ordered';

        vm.current.createOrUpdate()
          .then(successCallback)
          .catch(errorCallback);

        function successCallback(res) {
          Notification.info({
            message: 'Update successful!'
          });
          vm.current.assignedTo = $filter('filter')(vm.volunteers, { _id: vm.assignedTo })[0];
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
