(function() {
  'use strict';

  angular
    .module('groceries')
    .controller('AssignController', AssignController);

  AssignController.$inject = ['$scope', '$state', '$filter', '$uibModal', 'Notification', 'coreService', 'OrdersService'];

  function AssignController($scope, $state, $filter, $uibModal, Notification, coreService, OrdersService) {
    var vm = this;

    vm.complete = false;
    vm.volunteers = coreService.getOptions('volunteers');
    vm.allowSave = true;

    vm.assign = assign;
    vm.picklist = picklist;

    vm.orders = OrdersService.query({
      status: 'pending'
    }, function(orders) { });

    function updateOrder() {
      vm.current.$update(successCallback, errorCallback);

      function successCallback(res) {
        Notification.info({
          message: 'Update successful!'
        });
        checkList();
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    // Assign an order to a volunteer.
    function assign(order) {
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

        updateOrder()
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

    function checkList() {
      vm.complete = vm.orders.every(function(order) {
        return order.status === 'ordered';
      });

      if (vm.complete && vm.orders.length !== 0) {
        picklist();
      }
    }

    function picklist() {
      var header = 'Assignment Complete';
      var message = 'All the orders have been assigned. Would you like to continue to the the picklist or stay here to review the orders?';
      var buttonClass = 'success';

      if (!vm.complete) {
        header = 'Assignment Incomplete';
        message = 'Some of the orders have not been assigned. Are you sure you would like to continue?';
        buttonClass = 'danger';
      }

      var modalInstance = $uibModal.open({
        animation: true,
        template: '<div class="modal-header"><h3 class="modal-title">' + header + '</h3></div>' +
          '<div class="modal-body">' + message + '</div>' +
          '<div class="modal-footer">' +
          '<button class="btn btn-default" type="button" ng-click="vm.modalCancel()">Stay Here</button>' +
          '<button class="btn btn-' + buttonClass + '" type="button" ng-click="vm.modalOk()">Pick List</button>' +
          '</div>',
        scope: $scope
      });

      vm.modalOk = function() {
        modalInstance.close('OK Clicked');
        $state.go('groceries.list');
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
