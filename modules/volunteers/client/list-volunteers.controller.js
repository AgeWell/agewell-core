(function () {
  'use strict';

  angular
    .module('volunteers')
    .controller('VolunteersListController', VolunteersListController);

  VolunteersListController.$inject = ['VolunteersService'];

  function VolunteersListController(VolunteersService) {
    var vm = this;

    vm.volunteers = VolunteersService.query();

    console.log(vm);
  }
}());
