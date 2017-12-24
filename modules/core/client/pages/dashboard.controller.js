(function() {
  'use strict';

  angular
    .module('core')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', '$state', '$window', '$filter', '$uibModal', 'Authentication', 'Notification', 'coreService', 'ClientsService', 'ActionsService', 'OrdersService'];

  function DashboardController($scope, $state, $window, $filter, $uibModal, Authentication, Notification, coreService, ClientsService, ActionsService, OrdersService) {
    var vm = this;
    vm.dashboard = true;
    vm.options = coreService.getOptions('Order');
    vm.volunteers = coreService.getOptions('volunteers');
    vm.approve = approve;
    vm.skip = skip;
    vm.setFilter = setFilter;
    vm.complete = complete;
    vm.callList = [];
    vm.orders = [];
    vm.assign = assign;
    vm.actions = [];
    vm.ordersFilter = 'pending';

    vm.isAdmin = Authentication.user.isAdmin;

    vm.dates = {
      now: new Date(),
      orderBy: new Date(vm.options.order[0]),
      nextOrderBy: new Date(vm.options.order[1]),
      delivery: new Date(vm.options.delivery[0]),
      nextDelivery: new Date(vm.options.delivery[1])
    };

    ClientsService.query({
      active: true,
      groceryCallList: true,
      lastSkip: vm.dates.orderBy,
      lastOrdered: vm.dates.orderBy
    }, function(data) {
      vm.callList = data;
      buildPager('callList', 6);
    });


    function skip(index, client) {
      var modalInstance = $uibModal.open({
        animation: true,
        template: '<div class="modal-header"><h3 class="modal-title">Skip order</h3></div>' +
          '<div class="modal-body">Does this client want to skip ordering this week?</div>' +
          '<div class="modal-footer">' +
          '<button class="btn btn-warning" type="button" ng-click="vm.modalOk()">OK</button>' +
          '<button class="btn btn-default" type="button" ng-click="vm.modalCancel()">Cancel</button>' +
          '</div>',
        scope: $scope
      });

      vm.modalOk = function() {
        modalInstance.close('OK Clicked');
      };
      vm.modalCancel = function() {
        modalInstance.dismiss('Cancel Clicked');
      };

      modalInstance.result.then(function() {
        client.lastSkip = vm.dates.orderBy;

        client.$update(successCallback, errorCallback);

        function successCallback(res) {
          Notification.info({
            message: 'Update successful!'
          });
          vm.callList.splice(((vm.callListPage - 1) * vm.callListPerPage) + index, 1);
          if (vm.callList.length <= vm.callListPerPage) {
            vm.callListPage = 1;
          }
          pageChanged('callList', 6);
        }

        function errorCallback(res) {
          vm.error = res.data.message;
        }
      }, function() {
        console.info('modal-component dismissed at: ' + new Date());
      });
    }

    OrdersService.query({
      // date: vm.dates.orderBy
    }, function(data) {
      vm.orders = data;
      buildPager('orders', 5);
    });

    // Assign an order to a volunteer.
    function assign(order) {
      vm.current = order;

      if (typeof vm.current.assignedTo === 'object') {
        vm.assignedTo = vm.current.assignedTo._id;
      }

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/modules/groceries/client/views/modals/assign.html',
        scope: $scope
      });

      vm.modalOk = function() {
        modalInstance.close('OK Clicked');

        vm.current.assignedTo = vm.assignedTo;
        vm.current.status = 'ordered';

        vm.current.createOrUpdate()
          .then(successCallback)
          .catch(errorCallback);

        function successCallback(res) {
          Notification.info({
            message: 'Update successful!'
          });

          vm.current.assignedTo = $filter('filter')(vm.volunteers, { _id: vm.assignedTo })[0];
          pageChanged('orders', 5);
        }

        function errorCallback(res) {
          vm.current.status = 'pending';
          vm.error = res.data.message;
        }
      };
      vm.modalCancel = function() {
        modalInstance.dismiss('Cancel Clicked');
      };

      modalInstance.result.then(function() {
        console.log('Open Checkout Interface');
      }, function() {
        console.info('modal-component dismissed at: ' + new Date());
      });
    }

    // Pages related functions
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.itemsPerPage = 6;

    function buildPager(type, per) {
      vm['paged' + type] = [];
      vm[type + 'Page'] = 1;
      vm[type + 'PerPage'] = per;
      if (type !== 'orders') {
        vm[type + 'Filter'] = '';
      }
      vm.figureOutItemsToDisplay(type);
    }

    function figureOutItemsToDisplay(type) {
      vm['filtered' + type] = $filter('filter')(vm[type], {
        $: vm[type + 'Filter']
      });
      vm['filter' + type + 'Length'] = vm['filtered' + type].length;

      console.log(vm['filter' + type + 'Length'] < (vm[type + 'PerPage'] * vm[type + 'Page']));
      console.log(vm['filter' + type + 'Length'], vm[type + 'PerPage'], vm[type + 'Page']);

      if (vm[type + 'Filter'] !== '' && vm['filter' + type + 'Length'] < (vm[type + 'PerPage'] * (vm[type + 'Page'] - 1))) {
        console.log('hit');
        vm[type + 'Page'] = 1;
      }

      var begin = ((vm[type + 'Page'] - 1) * vm[type + 'PerPage']);
      var end = begin + vm[type + 'PerPage'];
      vm['paged' + type] = vm['filtered' + type].slice(begin, end);

      console.log(vm['paged' + type]);
    }

    function pageChanged(type) {
      vm.figureOutItemsToDisplay(type);
    }

    function setFilter(value) {
      vm.ordersFilter = value;
      vm.figureOutItemsToDisplay('orders');
    }

    ActionsService.query({
      completed: false
    }, function(data) {
      vm.actions = data;
      buildPager('actions', 3);
    });

    function complete(action) {
      action.completed = !action.completed;

      action.$update(successCallback, errorCallback);

      function successCallback(res) {
        Notification.info({
          message: 'Update successful!'
        });
        pageChanged('actions', 3);
      }

      function errorCallback(res) {
        vm.error = res.data.message;
        action.completed = !action.completed;
      }
    }

    function approve(order) {
      order.status = 'ordered';

      order.$update(successCallback, errorCallback);

      function successCallback(res) {
        Notification.info({
          message: 'Update successful!'
        });
        pageChanged('callList', 6);
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
