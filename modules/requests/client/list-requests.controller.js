(function () {
  'use strict';

  angular
    .module('requests')
    .controller('RequestsListController', RequestsListController);

  RequestsListController.$inject = ['RequestsService'];

  function RequestsListController(RequestsService) {
    let vm = this;

    vm.requests = RequestsService.query();
  }
}());
