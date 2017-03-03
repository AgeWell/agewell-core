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
      .state('volunteers.create', {
        url: '/create',
        templateUrl: '/modules/volunteers/client/views/form-volunteer.html',
        controller: 'VolunteersController',
        controllerAs: 'vm',
        resolve: {
          volunteerResolve: newVolunteer
        },
        data: {
          roles: ['admin'],
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
          roles: ['admin'],
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
          roles: ['admin'],
          pageTitle: 'Volunteer {{ volunteerResolve.name }}'
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
