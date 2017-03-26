(function () {
  'use strict';

  angular
    .module('groceriesToGo')
    .controller('GroceriesToGosListController', GroceriesToGosListController);

  GroceriesToGosListController.$inject = ['GroceriesToGosService'];

  function GroceriesToGosListController(GroceriesToGosService) {
    let vm = this;

    vm.groceriesToGos = GroceriesToGosService.query();
  }
}());
