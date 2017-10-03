(function() {
  'use strict';

  // Groceries to gos controller
  angular
    .module('groceries.orders')
    .controller('OrdersController', OrdersController);

  OrdersController.$inject = ['$scope', '$state', '$filter', '$stateParams', '$window', '$uibModal', 'OrdersService', 'Authentication', 'coreService', 'orderResolve'];

  function OrdersController($scope, $state, $filter, $stateParams, $window, $uibModal, OrdersService, Authentication, coreService, order) {
    var vm = this;

    vm.lastOrder = '';
    vm.authentication = Authentication;
    vm.order = order;
    vm.options = coreService.getOptions('Order');
    vm.volunteers = coreService.getOptions('volunteers');
    vm.assign = assign;
    vm.copyItems = copyItems;
    vm.error = null;
    vm.remove = remove;
    vm.update = update;
    vm.save = save;

    var holdState = false;

    vm.dates = {
      now: new Date(),
      orderBy: new Date(vm.options.order[0]),
      nextOrderBy: new Date(vm.options.order[1]),
      delivery: new Date(vm.options.delivery[0]),
      nextDelivery: new Date(vm.options.delivery[1])
    };

    if (!vm.order._id) {
      vm.order.clientId = $stateParams.clientId;
      vm.order.date = vm.orderBy;
      vm.order.items = [];
      vm.order.recieptTotal = 0.00;
      vm.order.deliveryCost = 10.00;
      vm.order.total = 10.00;
      if ($stateParams.lastOrder) {
        vm.lastOrder = $stateParams.lastOrder;
      }
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
        var item = vm.order.items[i];
        if (item.name === '') {
          return alert('All items require a name');
        }
        if (item.category === '') {
          return alert('All items require a category');
        }
        if (item.qty === '') {
          return alert('All items require a qty');
        }
        item.id = undefined;
      }

      vm.order.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        if (holdState === true) {
          holdState = false;
        } else {
          $state.go($state.previous.state.name || 'dashboard', $state.previous.params);
        }
      }

      function errorCallback(res) {
        console.log(res);
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
        holdState = true;
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

    // Assign an order to a volunteer.
    function copyItems() {
      vm.current = vm.order;

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/modules/groceries/client/views/modals/copy-items.html',
        scope: $scope
      });

      vm.modalOk = function() {
        modalInstance.close('OK Clicked');
        loadItems();
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

    function loadItems() {
      OrdersService.query({
        _id: vm.lastOrder
      }, function(data) {
        vm.pastOrder = data;
        for (var i = 0; i < data[0].items.length; i++) {
          vm.order.items.push(data[0].items[i]);
        }
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
