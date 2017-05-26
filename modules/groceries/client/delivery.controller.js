(function () {
  'use strict';

  angular
    .module('groceries')
    .controller('DeliveryController', DeliveryController);

  DeliveryController.$inject = ['$scope', '$stateParams', '$window', '$uibModal', 'Notification', 'OrdersService'];

  function DeliveryController($scope, $stateParams, $window, $uibModal, Notification, OrdersService) {
    let vm = this;

    vm.orders = OrdersService.query();
    vm.clientid = $stateParams.clientId;
    vm.isMobile = false;
    vm.paymentTypes = [
      'Cash',
      'Check',
      'Credit Card'
    ];

    vm.ready = ready;
    vm.getAddress = getAddress;
    vm.deliver = deliver;

    if ($window.innerWidth < 992) {
      vm.isMobile = true;
    }

    function getAddress(address) {
      // console.log(address);
      return address.street + ', ' + address.city + ', ' + address.state + ' ' + address.zipcode;
    }

    function deliver(order) {
      vm.current = order;
      if (typeof vm.current.followupNeeded === 'undefined') {
        vm.current.followupNeeded = '';
      }

      console.log(vm.current);

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/modules/groceries/client/views/modals/deliver.html',
        scope: $scope
      });

      vm.modalOk = function() {
        modalInstance.close('OK Clicked');
        updateOrder();
      };
      vm.modalCancel = function() {
        modalInstance.dismiss('Cancel Clicked');
      };
    }

    function updateOrder() {

      vm.current.status = 'delivered';

      vm.current.$update(successCallback, errorCallback);

      function successCallback(res) {
        Notification.info({
          message: 'Update successful!'
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
        vm.current.status = 'purchased';
      }
    }

    function ready() {
      if (!vm.current.hasOwnProperty('delivery')) {
        return true;
      }
      let delivery = vm.current.delivery;
      if (
        delivery.hasOwnProperty('payment') && delivery.hasOwnProperty('method') && delivery.hasOwnProperty('followup')
      ) {
        return false;
      }

      return true;
    }
  }
}());
