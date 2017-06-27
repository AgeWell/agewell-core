(function() {
  'use strict';

  // Groceries to gos controller
  angular
    .module('groceries.orders')
    .controller('OrdersController', OrdersController);
    // TODO: Add a function to duplicate the prior orders items
    // TODO: Limit the ability to creat new orders if one already exists for the time period

  OrdersController.$inject = ['$scope', '$state', '$filter', '$stateParams', '$window', '$uibModal', 'Authentication', 'coreService', 'orderResolve'];

  function OrdersController($scope, $state, $filter, $stateParams, $window, $uibModal, Authentication, coreService, order) {
    var vm = this;

    vm.authentication = Authentication;
    vm.order = order;
    vm.options = coreService.getOptions('Order');
    vm.volunteers = coreService.getOptions('volunteers');
    vm.assign = assign;
    vm.error = null;
    vm.remove = remove;
    vm.update = update;
    vm.save = save;

    vm.dates = {
      now: new Date(),
      orderBy: new Date(vm.options.order[0]),
      nextOrderBy: new Date(vm.options.order[1]),
      delivery: new Date(vm.options.delivery[0]),
      nextDelivery: new Date(vm.options.delivery[1])
    };

    console.log(vm);

    if (!vm.order._id) {
      vm.order.clientId = $stateParams.clientId;
      vm.order.date = vm.orderBy;
      vm.order.items = [];
      vm.order.recieptTotal = 0.00;
      vm.order.deliveryCost = 10.00;
      vm.order.total = 10.00;
    }

    // Remove existing Groceries to go
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.order.$remove($state.go('groceries.orders.list'));
      }
    }

    // Save Groceries to go
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.orderForm');
        return false;
      }

      for (var i = 0; i < vm.order.items.length; i++) {
        vm.order.items[i].id = undefined;
      }

      vm.order.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('order.view', {
          clientId: vm.order.clientId,
          orderId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    // Assign an order to a volunteer.
    function assign() {
      vm.current = vm.order;

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/modules/groceries/client/views/modals/assign.html',
        scope: $scope
      });

      vm.modalOk = function() {
        modalInstance.close('OK Clicked');
        console.log(vm.current);
        save(true);
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

    // updates the order when new items are added.
    function update() {
      totals();
    }

    // Helpers
    function totals() {
      vm.order.total = +vm.order.recieptTotal + +vm.order.deliveryCost;
    }

    // Listeners
    $scope.$on('updateOrder', function() {
      console.log('update order', vm);
      vm.update();
    });
  }
}());
