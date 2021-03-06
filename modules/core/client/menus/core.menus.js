(function () {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', 'Authentication'];

  function menuConfig(menuService, Authentication) {
    var profileEdit = 'settings.profile';

    if (Authentication.user !== null && Authentication.user.roles.indexOf('volunteer') !== -1) {
      if (Authentication.user.hasOwnProperty('volunteerId')) {
        profileEdit = 'settings.volunteer.edit({volunteerId: \'' + Authentication.user.volunteerId + '\'})';
      } else {
        profileEdit = 'settings.volunteer.create';
      }
    }

    menuService.addMenu('account', {
      roles: ['user']
    });

    menuService.addMenuItem('account', {
      title: '',
      state: 'settings',
      type: 'dropdown',
      roles: ['user']
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Edit Profile',
      state: profileEdit,
      roles: ['user']
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Edit Profile Picture',
      state: 'settings.picture',
      roles: ['user']
    });
  }
}());
