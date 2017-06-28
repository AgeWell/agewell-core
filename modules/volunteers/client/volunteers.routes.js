(function () {
  'use strict';

  angular
    .module('volunteers')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('volunteers', {
        abstract: true,
        url: '/volunteers',
        template: '<ui-view/>'
      })
      .state('volunteers.list', {
        url: '',
        templateUrl: '/modules/volunteers/client/views/list-volunteers.html',
        controller: 'VolunteersListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: 'Volunteers List'
        }
      })
      .state('volunteers.approve', {
        url: '/approve',
        templateUrl: '/modules/volunteers/client/views/approve-volunteers.html',
        controller: 'ApproveVolunteersController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: 'Approve Volunteers'
        }
      })
      .state('volunteers.create', {
        url: '/create',
        templateUrl: '/modules/volunteers/client/views/form-volunteer.html',
        controller: 'VolunteersController',
        controllerAs: 'vm',
        resolve: {
          volunteerResolve: newVolunteer
        },
        data: {
          roles: ['admin', 'volunteer'],
          pageTitle: 'Volunteers Create'
        }
      })
      .state('volunteers.edit', {
        url: '/:volunteerId/edit',
        templateUrl: '/modules/volunteers/client/views/form-volunteer.html',
        controller: 'VolunteersController',
        controllerAs: 'vm',
        resolve: {
          volunteerResolve: getVolunteer
        },
        data: {
          roles: ['admin', 'volunteer'],
          pageTitle: 'Edit Volunteer {{ volunteerResolve.name }}'
        }
      })
      .state('volunteers.view', {
        url: '/:volunteerId',
        templateUrl: '/modules/volunteers/client/views/view-volunteer.html',
        controller: 'VolunteersController',
        controllerAs: 'vm',
        resolve: {
          volunteerResolve: getVolunteer
        },
        data: {
          roles: ['admin', 'volunteer'],
          pageTitle: 'Volunteer {{ volunteerResolve.name }}'
        }
      })
      .state('settings.volunteer', {
        abstract: true,
        url: '/volunteer',
        template: '<ui-view/>'
      })
      // TODO: The voluteers profile should be loaded instead of the create page.
      .state('settings.volunteer.create', {
        url: '',
        params: {
          editProfile: true
        },
        templateUrl: '/modules/volunteers/client/views/form-volunteer.html',
        controller: 'VolunteersController',
        controllerAs: 'vm',
        resolve: {
          volunteerResolve: newVolunteer
        },
        data: {
          roles: ['volunteer'],
          pageTitle: 'Create Profile'
        }
      })
      .state('settings.volunteer.edit', {
        url: '/volunteer/:volunteerId',
        templateUrl: '/modules/volunteers/client/views/form-volunteer.html',
        controller: 'VolunteersController',
        controllerAs: 'vm',
        resolve: {
          volunteerResolve: getVolunteer
        },
        data: {
          roles: ['volunteer'],
          pageTitle: 'Edit Profile'
        }
      });
  }

  getVolunteer.$inject = ['$stateParams', 'VolunteersService'];

  function getVolunteer($stateParams, VolunteersService) {
    return VolunteersService.get({
      volunteerId: $stateParams.volunteerId
    }).$promise;
  }

  newVolunteer.$inject = ['VolunteersService'];

  function newVolunteer(VolunteersService) {
    return new VolunteersService();
  }
}());
