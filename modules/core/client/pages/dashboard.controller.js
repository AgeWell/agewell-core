(function() {
  'use strict';

  angular
    .module('core')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', '$state', '$window', '$filter', '$uibModal', 'Authentication', 'Notification', 'coreService', 'ClientsService', 'OrdersService'];

  function DashboardController($scope, $state, $window, $filter, $uibModal, Authentication, Notification, coreService, ClientsService, OrdersService) {
    var vm = this;
    vm.options = coreService.getOptions('Order');
    vm.approve = approve;
    vm.skip = skip;
    vm.setFilter = setFilter;
    vm.callList = [];
    vm.orders = [];
    vm.actions = [];
    vm.ordersFilter = 'ordered';

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
      lastOrder: vm.dates.orderBy
    }, function(data) {
      vm.callList = data;
      buildPager('callList', 6);
    });


    function skip(client) {
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
        console.log(client);
        client.lastSkip = vm.dates.orderBy;

        client.$update(successCallback, errorCallback);

        function successCallback(res) {
          Notification.info({
            message: 'Update successful!'
          });
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
      // active: true,
      // groceryCallList: true,
      // date: vm.dates.orderBy
    }, function(data) {
      vm.orders = data;
      buildPager('orders', 5);

      console.log(vm.orders);
      console.log(vm);
    });

    // Pages related functions
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.itemsPerPage = 6;

    function buildPager(type, per) {
      vm['paged' + type] = [];
      vm[type + 'Page'] = 1;
      vm[type + 'PerPage'] = per;
      vm.figureOutItemsToDisplay(type);
    }

    function figureOutItemsToDisplay(type) {
      vm['filtered' + type] = $filter('filter')(vm[type], {
        $: vm[type + 'Filter']
      });
      vm['filter' + type + 'Length'] = vm['filtered' + type].length;
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
      console.log(value);
    }

    for (var j = 0; j < 5; j++) {
      vm.actions.push({
        clientId: j,
        actionId: j,
        type: 'House Check',
        note: 'Needs a follow up. make sure to address this.',
        contact: {
          firstName: 'Jane',
          lastName: 'Doe'
        },
        status: 'Active'
      });
    }
    buildPager('actions', 3);

    // Pages related functions
    // vm.actionsPager = actionsPager;
    // vm.actionsToDisplay = actionsToDisplay;
    // vm.actionspageChanged = actionspageChanged;
    // vm.actionsPerPage = 3;
    //
    // function actionsPager(type) {
    //   vm['paged' + type] = [];
    //   vm[type + 'Page'] = 1;
    //   vm.actionsToDisplay(type);
    // }
    //
    // function actionsToDisplay(type) {
    //   vm.actionsList = $filter('filter')(vm.callList, {
    //     $: vm.search
    //   });
    //   vm['filter' + type + 'Length'] = vm['filtered' + type].length;
    //   var begin = ((vm[type + 'Page'] - 1) * vm.itemsPerPage);
    //   var end = begin + vm.itemsPerPage;
    //   vm['paged' + type] = vm['filtered' + type].slice(begin, end);
    // }
    //
    // function actionspageChanged(type) {
    //   vm.actionsToDisplay(type);
    // }

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
