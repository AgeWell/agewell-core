(function() {
  'use strict';

  // Groceries to gos controller
  angular
    .module('groceries.orders')
    .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['$scope', '$state', '$filter', '$window', 'coreService'];

  function ItemsController($scope, $state, $filter, $window, coreService) {
    let vm = this;

    vm.options = coreService.getOptions('Grocery');
    vm.error = null;

    // vm.showStatus = showStatus;
    // vm.checkName = checkName;
    vm.saveItem = saveItem;
    vm.removeItem = removeItem;
    vm.addItem = addItem;
    vm.updateOrder = updateOrder;

    console.log(vm);

    function saveItem(data, id) {
      angular.extend(data, {
        id: id
      });
      // return $http.post('/saveUser', data);
      return console.log('Item Saved');
    }


    // remove user
    function removeItem(index) {
      vm.items.splice(index, 1);
    }

    // add user
    function addItem() {
      vm.inserted = {
        id: vm.items.length + 1,
        name: '',
        qty: 0,
        // price: 0,
        category: ''
      };
      vm.items.push(vm.inserted);
      console.log(vm.items);
    }

    function updateOrder() {
      console.log('emit update');
      $scope.$emit('updateOrder');
    }
  }
}());
