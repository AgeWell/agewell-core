(function () {
  'use strict';

  angular
    .module('users')
    .controller('SettingsController', SettingsController);

  SettingsController.$inject = ['$scope', 'Authentication'];

  function SettingsController($scope, Authentication) {
    var vm = this;

    vm.user = Authentication.user;
    vm.profileEdit = 'settings.profile';

    if (vm.user.roles.indexOf('volunteer') !== -1) {
      if (vm.user.hasOwnProperty('volunteerId')) {
        vm.profileEdit = 'settings.volunteer.edit({volunteerId: \'' + vm.user.volunteerId + '\'})';
      } else {
        vm.profileEdit = 'settings.volunteer.create';
      }
    }
  }
}());
