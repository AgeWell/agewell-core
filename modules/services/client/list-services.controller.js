(function () {
  'use strict';

  angular
    .module('services')
    .controller('ServicesListController', ServicesListController);

  ServicesListController.$inject = ['ServicesService'];

  function ServicesListController(ServicesService) {
    let vm = this;

    vm.services = ServicesService.query();
  }
}());
