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
    vm.save = save;

    vm.showStatus = showStatus;
    vm.checkName = checkName;
    vm.removeItem = removeItem;
    vm.addItem = addItem;

    vm.dates = {
      now: new Date(),
      orderBy: new Date(vm.options.order[0]),
      nextOrderBy: new Date(vm.options.order[1]),
      delivery: new Date(vm.options.delivery[0]),
      nextDelivery: new Date(vm.options.delivery[1])
    };

    if (!vm.order._id) {
      vm.order.clientId = $stateParams;
      vm.order.items = [];
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

    function showStatus(item) {
      var selected = [];
      if (item.status) {
        selected = $filter('filter')(vm.options.status, {
          value: item.status
        });
      }
      return selected.length ? selected[0].text : 'Not set';
    }

    function checkName(data, id) {
      if (id === 2 && data !== 'awesome') {
        return 'Username 2 should be `awesome`';
      }
    }


    // remove user
    function removeItem(index) {
      vm.users.splice(index, 1);
    }

    // add user
    function addItem() {
      vm.inserted = {
        id: vm.order.items.length + 1,
        name: '',
        qty: 0,
        price: 0,
        category: ''
      };
      vm.order.items.push(vm.inserted);
      console.log(vm.order);
    }
  }
}());
