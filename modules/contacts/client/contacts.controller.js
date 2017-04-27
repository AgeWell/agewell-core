(function() {
  'use strict';

  // Contacts controller
  angular
    .module('contacts')
    .controller('ContactsController', ContactsController);

  ContactsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'coreService'];

  function ContactsController($scope, $state, $window, Authentication, coreService) {
    let vm = this;
    vm.options = coreService.getOptions('Contact');

    console.log(vm);

    $scope.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(),
      startingDay: 1
    };

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.popup1 = {
      opened: false
    };
  }
}());
