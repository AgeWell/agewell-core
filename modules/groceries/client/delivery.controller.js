(function() {
  'use strict';

  angular
    .module('groceries')
    .controller('DeliveryController', DeliveryController);

  DeliveryController.$inject = ['$scope', '$stateParams', '$window', '$uibModal', 'Notification', 'ActionsService', 'OrdersService'];

  function DeliveryController($scope, $stateParams, $window, $uibModal, Notification, ActionsService, OrdersService) {
    var vm = this;

    vm.clientid = $stateParams.clientId;
    vm.complete = false;
    vm.isMobile = false;
    vm.paymentTypes = [
      'Cash',
      'Check',
      'Credit Card'
    ];

    vm.ready = ready;
    vm.getAddress = getAddress;
    vm.deliver = deliver;

    vm.orders = OrdersService.query({
      status: 'purchased'
    }, function(orders) {
      console.log(orders);
      console.log(vm);
      checkList();
    });

    if ($window.innerWidth < 992) {
      vm.isMobile = true;
    }

    function getAddress(address) {
      // console.log(address);
      return address.street + ', ' + address.city + ', ' + address.state + ' ' + address.zipcode;
    }

    function deliver(order) {
      vm.current = order;

      // if (typeof vm.current.delivery === 'undefined') {
      //   vm.current.delivery = {
      //     followup: ''
      //   };
      // }

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
        if (vm.current.delivery.followup === true) {
          return createAction(checkList);
        }
        return checkList();
      }

      function errorCallback(res) {
        vm.error = res.data.message;
        vm.current.status = 'purchased';
      }
    }

    function createAction(checkList) {
      vm.action = new ActionsService({
        created: new Date(),
        complete: false,
        clientId: vm.current.clientId,
        notes: vm.current.delivery.notes
      });

      vm.action.$save(successCallback, errorCallback);

      function successCallback(res) {
        Notification.info({
          message: 'Action Created'
        });
        checkList();
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    function checkList() {
      console.log(vm.complete);
      vm.complete = vm.orders.every(function(order) {
        return order.status === 'delivered';
      });
      console.log(vm.complete);
    }

    function ready() {
      if (!vm.current.hasOwnProperty('delivery')) {
        return true;
      }
      var delivery = vm.current.delivery;
      if (delivery.hasOwnProperty('payment') && delivery.hasOwnProperty('method') && delivery.hasOwnProperty('followup')) {
        return false;
      }

      return true;
    }
  }
}());
