(function () {
  'use strict';

  describe('Clients Route Tests', function () {
    // Initialize global variables
    let $scope,
      ClientsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ClientsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ClientsService = _ClientsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        let mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('clients');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/clients');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        let viewstate,
          ClientsController,
          mockClient;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('clients.view');
          $templateCache.put('modules/clients/client/views/view-client.client.view.html', '');

          // create mock Client
          mockClient = new ClientsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Client Name'
          });

          // Initialize Controller
          ClientsController = $controller('ClientsController as vm', {
            $scope: $scope,
            clientResolve: mockClient
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:clientId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.clientResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            clientId: 1
          })).toEqual('/clients/1');
        }));

        it('should attach an Client to the controller scope', function () {
          expect($scope.vm.client._id).toBe(mockClient._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/clients/client/views/view-client.client.view.html');
        });
      });

      describe('Create Route', function () {
        let createstate,
          ClientsController,
          mockClient;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('clients.create');
          $templateCache.put('modules/clients/client/views/form-client.client.view.html', '');

          // create mock Client
          mockClient = new ClientsService();

          // Initialize Controller
          ClientsController = $controller('ClientsController as vm', {
            $scope: $scope,
            clientResolve: mockClient
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.clientResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/clients/create');
        }));

        it('should attach an Client to the controller scope', function () {
          expect($scope.vm.client._id).toBe(mockClient._id);
          expect($scope.vm.client._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/clients/client/views/form-client.client.view.html');
        });
      });

      describe('Edit Route', function () {
        let editstate,
          ClientsController,
          mockClient;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('clients.edit');
          $templateCache.put('modules/clients/client/views/form-client.client.view.html', '');

          // create mock Client
          mockClient = new ClientsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Client Name'
          });

          // Initialize Controller
          ClientsController = $controller('ClientsController as vm', {
            $scope: $scope,
            clientResolve: mockClient
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:clientId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.clientResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            clientId: 1
          })).toEqual('/clients/1/edit');
        }));

        it('should attach an Client to the controller scope', function () {
          expect($scope.vm.client._id).toBe(mockClient._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/clients/client/views/form-client.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
