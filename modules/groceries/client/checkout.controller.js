(function() {
  'use strict';

  angular
    .module('groceries')
    .controller('CheckoutController', CheckoutController);

  CheckoutController.$inject = ['$scope', '$stateParams', '$state', '$timeout', '$uibModal', 'Notification', 'OrdersService', 'Upload'];

  function CheckoutController($scope, $stateParams, $state, $timeout, $uibModal, Notification, OrdersService, Upload) {
    let vm = this;

    vm.clientid = $stateParams.clientId;

    vm.checkout = checkout;
    vm.updateOrder = updateOrder;
    vm.upload = upload;

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


    function upload(dataUrl) {

      Upload.upload({
        url: '/api/orders/reciept',
        data: {
          reciept: dataUrl
        }
      }).then(function(response) {
        $timeout(function() {
          onSuccessItem(response.data);
        });
      }, function(response) {
        if (response.status > 0) onErrorItem(response.data);
      }, function(evt) {
        vm.progress = parseInt((100.0 * evt.loaded) / evt.total, 10);
      });
    }

    // Called after the user has successfully uploaded a new picture
    function onSuccessItem(response) {
      // Show success message
      Notification.success({
        message: '<i class="glyphicon glyphicon-ok"></i> Successfully uploaded reciept'
      });

      // Reset form
      vm.fileSelected = false;
      vm.progress = 0;
    }

    // Called after the user has failed to upload a new picture
    function onErrorItem(response) {
      vm.fileSelected = false;
      vm.progress = 0;

      // Show error message
      Notification.error({
        message: response.message,
        title: '<i class="glyphicon glyphicon-remove"></i> Failed to upload reciept'
      });
    }

  }
}());
