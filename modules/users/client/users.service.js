(function () {
  'use strict';

  // Users service used for communicating with the users REST endpoint
  angular
    .module('users.services')
    .factory('UsersService', UsersService);

  UsersService.$inject = ['$resource'];

  function UsersService($resource) {
    var Users = $resource('/api/users', {}, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Users, {
      removeSocialAccount: function (provider) {
        return this.deleteProvider({
          provider: provider // api expects provider as a querystring parameter
        }).$promise;
      },
      userSignin: function (credentials) {
        return this.signin(credentials).$promise;
      }
    });

    return Users;
  }
}());
