(function () {
  'use strict';

  angular
    .module('groceries-to-gos')
    .controller('GroceriesToGosListController', GroceriesToGosListController);

  GroceriesToGosListController.$inject = ['GroceriesToGosService'];

  function GroceriesToGosListController(GroceriesToGosService) {
    let vm = this;

    vm.groceriesToGos = GroceriesToGosService.query();
  }
}());
