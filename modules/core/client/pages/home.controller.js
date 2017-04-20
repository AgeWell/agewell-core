(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$location', 'Authentication'];

  function HomeController($location, Authentication) {
    var vm = this;

    vm.authentication = Authentication;

    if (vm.authentication.user) {
      $location.path('/dashboard');
    }
  }
}());
