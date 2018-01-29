(function () {
  'use strict';

  angular
    .module('rides')
    .directive('listRides', listRides);

  function listRides() {
    var directive = {
      restrict: 'E',
      scope: {
        clientId: '='
      },
      controller: 'RidesListController',
      controllerAs: 'vm',
      bindToController: true,
      replace: true,
      transclude: true,
      templateUrl: '/modules/rides/client/views/list-rides.html'
    };

    return directive;
  }
}());
