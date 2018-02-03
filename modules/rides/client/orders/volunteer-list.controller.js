(function() {
  'use strict';

  angular
    .module('rides')
    .controller('RideVolunteerListController', RideVolunteerListController);

  RideVolunteerListController.$inject = ['RidesService', '$window', '$filter', '$stateParams'];

  function RideVolunteerListController(RidesService, $window, $filter, $stateParams) {
    var vm = this;

    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.getAddress = getAddress;
    vm.isMobile = false;

    RidesService.query(function(data) {
      vm.rides = data;
      vm.buildPager();
    });

    if ($window.innerWidth < 992) {
      vm.isMobile = true;
    }

    function getAddress(address) {
      return address.street + ', ' + address.city + ', ' + address.state + ' ' + address.zipcode;
    }

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 15;
      vm.currentPage = 1;
      vm.search = '';
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = vm.rides;
      vm.filterLength = vm.filteredItems.length;
      if (vm.search !== '' && vm.filterLength < (vm.itemsPerPage * (vm.currentPage - 1))) {
        vm.currentPage = 1;
      }
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }
}());
