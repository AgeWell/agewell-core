(function() {
  'use strict';

  angular
    .module('groceries')
    .controller('CheckoutController', CheckoutController);

  CheckoutController.$inject = ['$scope', '$stateParams', '$state', '$uibModal', 'Notification', 'OrdersService'];

  function CheckoutController($scope, $stateParams, $state, $uibModal, Notification, OrdersService) {
    let vm = this;

    vm.clientid = $stateParams.clientId;

    vm.checkout = checkout;
    vm.updateOrder = updateOrder;

    vm.orders = OrdersService.query({
      status: 'incart'
    }, function(orders) {
      console.log(orders);
    });


    function checkout(order) {
      vm.current = order;

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/modules/groceries/client/views/modals/checklist.html',
        scope: $scope
      });

      vm.modalOk = function() {
        modalInstance.close('OK Clicked');
        receipt(order);
      };
      vm.modalCancel = function() {
        modalInstance.dismiss('Cancel Clicked');
      };
    }


    function receipt(order) {
      vm.current = order;

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/modules/groceries/client/views/modals/reciept.html',
        scope: $scope
      });

      vm.modalOk = function() {
        modalInstance.close('OK Clicked');
        updateOrder();
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

    function updateOrder() {

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
  }
}());
