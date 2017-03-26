(function () {
  'use strict';

  // Groceries to gos controller
  angular
    .module('groceries.orders')
    .controller('OrdersController', OrdersController);

  OrdersController.$inject = ['$scope', '$state', '$window', 'Authentication', 'coreService', 'orderResolve'];

  function OrdersController ($scope, $state, $window, Authentication, coreService, order) {
    let vm = this;

    vm.authentication = Authentication;
    vm.order = order;
    vm.options = coreService.getOptions('Order');
    vm.error = null;
    vm.remove = remove;
    vm.save = save;

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

      // TODO: move create/update logic to service
      if (vm.order._id) {
        vm.order.$update(successCallback, errorCallback);
      } else {
        vm.order.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('groceries.orders.view', {
          orderId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
