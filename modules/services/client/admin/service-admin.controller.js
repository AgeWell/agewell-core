(function () {
  'use strict';

  angular
    .module('services.admin')
    .controller('ServicesAdminController', ServicesAdminController);

  ServicesAdminController.$inject = ['$scope', '$state', '$window', 'Authentication', 'serviceResolve', 'Notification'];

  function ServicesAdminController($scope, $state, $window, Authentication, service, Notification) {
    var vm = this;

    vm.authentication = Authentication;
    vm.service = service;
    vm.remove = remove;
    vm.update = update;
    vm.isContextServiceSelf = isContextServiceSelf;

    function remove(service) {
      if ($window.confirm('Are you sure you want to delete this service?')) {
        if (service) {
          service.$remove();

          vm.services.splice(vm.services.indexOf(service), 1);
          Notification.success('Service deleted successfully!');
        } else {
          vm.service.$remove(function () {
            $state.go('admin.services');
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Service deleted successfully!' });
          });
        }
      }
    }

    function update(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.serviceForm');

        return false;
      }

      var service = vm.service;

      service.$update(function () {
        $state.go('admin.service', {
          serviceId: service._id
        });
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Service saved successfully!' });
      }, function (errorResponse) {
        Notification.error({ message: errorResponse.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Service update error!' });
      });
    }

    function isContextServiceSelf() {
      return vm.service.servicename === vm.authentication.service.servicename;
    }
  }
}());
