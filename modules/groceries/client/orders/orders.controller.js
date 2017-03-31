(function() {
  'use strict';

  // Groceries to gos controller
  angular
    .module('groceries.orders')
    .controller('OrdersController', OrdersController);

  OrdersController.$inject = ['$scope', '$state', '$filter', '$stateParams', '$window', 'Authentication', 'coreService', 'orderResolve'];

  function OrdersController($scope, $state, $filter, $stateParams, $window, Authentication, coreService, order) {
    let vm = this;

    vm.authentication = Authentication;
    vm.order = order;
    vm.options = coreService.getOptions('Order');
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

    if (!vm.order._id) {
      vm.order.clientId = $stateParams.clientId;
      vm.order.date = vm.delivery;
      vm.order.items = [];
      vm.order.subtotal = 0.00;
      vm.order.deliveryCost = 10.00;
      vm.order.total = 10.00;
    }

    console.log(vm);
    console.log($stateParams);

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

      // TODO: move create/update logic to service
      if (vm.order._id) {
        vm.order.$update(successCallback, errorCallback);
      } else {
        vm.order.date = new Date();
        vm.order.$save(successCallback, errorCallback);
      }

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

    // updates the order when new items are added.
    function update() {
      totals();
    }

    // Helpers

    function totals() {
      vm.order.subtotal = 0.00;

      for (var i = 0; i < vm.order.items.length; i++) {
        vm.order.subtotal += (vm.order.items[i].qty * vm.order.items[i].price);
      }

      vm.order.total = vm.order.subtotal + vm.order.deliveryCost;
      console.log(vm);
    }

    // Listeners
    $scope.$on('updateOrder', function() {
      console.log('update order', vm);
      vm.update();
    });
  }
}());
