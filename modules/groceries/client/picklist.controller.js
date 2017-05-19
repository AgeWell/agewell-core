(function () {
  'use strict';

  angular
    .module('groceries')
    .controller('PicklistController', PicklistController);

  PicklistController.$inject = ['$stateParams', 'Notification', 'OrdersService'];

  function PicklistController($stateParams, Notification, OrdersService) {
    let vm = this;

    vm.picklist = [];
    vm.toggle = toggle;

    vm.orders = OrdersService.query({
      status: 'ordered'
    }, function(orders) {
      for (let i = 0; i < orders.length; i++) {
        let order = orders[i];
        for (let j = 0; j < order.items.length; j++) {
          vm.picklist.push({
            name: order.items[j].name,
            keys: [i, j],
            category: order.items[j].category,
            qty: order.items[j].qty,
            clientId: orders[i].clientId,
            inCart: order.items[j].inCart
          });
        }
      }
    });

    function toggle(itemData) {
      let order = vm.orders[itemData.keys[0]];
      let item = order.items[itemData.keys[1]];

      itemData.inCart = !itemData.inCart;
      item.inCart = !item.inCart;

      order.$update(successCallback, errorCallback);

      function successCallback(res) {
        Notification.info({ message: 'Update successful!' });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
        itemData.inCart = !itemData.inCart;
        item.inCart = !item.inCart;
      }
    }

    console.log(vm);
  }
}());
