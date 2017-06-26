(function() {
  'use strict';

  angular
    .module('groceries')
    .controller('PicklistController', PicklistController);
  // TODO: Add a function to assign orders to volunteers

  PicklistController.$inject = ['$filter', '$scope', '$state', '$stateParams', '$uibModal', 'Notification', 'OrdersService'];

  function PicklistController($filter, $scope, $state, $stateParams, $uibModal, Notification, OrdersService) {
    var vm = this;

    vm.picklist = [];
    vm.complete = false;

    vm.checkout = checkout;
    vm.toggle = toggle;
    vm.notAvailable = notAvailable;

    vm.orders = OrdersService.query({
      status: 'ordered'
    }, function(orders) {
      for (var i = 0; i < orders.length; i++) {
        var order = orders[i];
        var client = orders[i].contact;
        for (var j = 0; j < order.items.length; j++) {
          vm.picklist.push({
            name: order.items[j].name,
            keys: [i, j],
            category: order.items[j].category,
            qty: order.items[j].qty,
            client: client.firstName + ' ' + client.lastName,
            clientId: orders[i].clientId,
            orderId: orders[i]._id,
            inCart: order.items[j].inCart,
            notAvailable: order.items[j].notAvailable
          });
        }
      }
      vm.picklist = $filter('orderBy')(vm.picklist, 'category');
      checkList();
    });

    function toggle(itemData) {
      var order = vm.orders[itemData.keys[0]];
      var item = order.items[itemData.keys[1]];

      itemData.inCart = !itemData.inCart;
      item.inCart = !item.inCart;

      if (itemData.notAvailable) {
        itemData.notAvailable = false;
        item.notAvailable = false;
      }

      var orderComplete = order.items.every(function(listItem) {
        return listItem.inCart || listItem.notAvailable;
      });

      if (orderComplete) {
        order.status = 'incart';
      }

      order.$update(successCallback, errorCallback);

      function successCallback(res) {
        Notification.info({
          message: 'Update successful!'
        });
        checkList();
      }

      function errorCallback(res) {
        vm.error = res.data.message;
        itemData.inCart = !itemData.inCart;
        item.inCart = !item.inCart;

        orderComplete = order.items.every(function(listItem) {
          return listItem.inCart || listItem.notAvailable;
        });

        if (!orderComplete) {
          order.status = 'ordered';
        }
      }
    }

    function notAvailable(itemData) {
      var order = vm.orders[itemData.keys[0]];
      var item = order.items[itemData.keys[1]];

      itemData.notAvailable = !itemData.notAvailable;
      item.notAvailable = !item.notAvailable;

      var orderComplete = order.items.every(function(listItem) {
        return listItem.inCart || listItem.notAvailable;
      });

      if (orderComplete) {
        order.status = 'incart';
      }

      order.$update(successCallback, errorCallback);

      function successCallback(res) {
        Notification.info({
          message: 'Update successful!'
        });
        checkList();
      }

      function errorCallback(res) {
        vm.error = res.data.message;
        itemData.notAvailable = !itemData.notAvailable;
        item.notAvailable = !item.notAvailable;

        orderComplete = order.items.every(function(listItem) {
          return listItem.inCart || listItem.notAvailable;
        });

        if (!orderComplete) {
          order.status = 'ordered';
        }
      }
    }

    function checkList() {
      vm.complete = vm.picklist.every(function(listItem) {
        return listItem.inCart || listItem.notAvailable;
      });

      if (vm.complete && vm.orders.length !== 0) {
        checkout();
      }
    }

    function checkout() {
      var header = 'Pick List Complete';
      var message = 'All the items on this picklist have been added to the cart. Would you like to continue to the checkout or stay here to review the cart?';
      var buttonClass = 'success';

      if (!vm.complete) {
        header = 'Pick List Incomplete';
        message = 'Some of the items on this pick list have not been added to the cart. Are you sure you would like to continue?';
        buttonClass = 'danger';
      }

      var modalInstance = $uibModal.open({
        animation: true,
        template: '<div class="modal-header"><h3 class="modal-title">' + header + '</h3></div>' +
          '<div class="modal-body">' + message + '</div>' +
          '<div class="modal-footer">' +
          '<button class="btn btn-default" type="button" ng-click="vm.modalCancel()">Stay Here</button>' +
          '<button class="btn btn-' + buttonClass + '" type="button" ng-click="vm.modalOk()">Checkout</button>' +
          '</div>',
        scope: $scope
      });

      vm.modalOk = function() {
        modalInstance.close('OK Clicked');
        $state.go('groceries.checkout');
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
