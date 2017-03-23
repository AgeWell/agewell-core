(function () {
  'use strict';

  describe('Groceries to gos Route Tests', function () {
    // Initialize global variables
    let $scope,
      GroceriesToGosService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _GroceriesToGosService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      GroceriesToGosService = _GroceriesToGosService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        let mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('groceries-to-go');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/groceries-to-go');
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
          GroceriesToGosController,
          mockGroceriesToGo;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('groceries-to-go.view');
          $templateCache.put('modules/groceries-to-go/client/views/view-groceries-to-go.client.view.html', '');

          // create mock Groceries to go
          mockGroceriesToGo = new GroceriesToGosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Groceries to go Name'
          });

          // Initialize Controller
          GroceriesToGosController = $controller('GroceriesToGosController as vm', {
            $scope: $scope,
            groceriesToGoResolve: mockGroceriesToGo
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:groceriesToGoId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.groceriesToGoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            groceriesToGoId: 1
          })).toEqual('/groceries-to-go/1');
        }));

        it('should attach an Groceries to go to the controller scope', function () {
          expect($scope.vm.groceriesToGo._id).toBe(mockGroceriesToGo._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/groceries-to-go/client/views/view-groceries-to-go.client.view.html');
        });
      });

      describe('Create Route', function () {
        let createstate,
          GroceriesToGosController,
          mockGroceriesToGo;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('groceries-to-go.create');
          $templateCache.put('modules/groceries-to-go/client/views/form-groceries-to-go.client.view.html', '');

          // create mock Groceries to go
          mockGroceriesToGo = new GroceriesToGosService();

          // Initialize Controller
          GroceriesToGosController = $controller('GroceriesToGosController as vm', {
            $scope: $scope,
            groceriesToGoResolve: mockGroceriesToGo
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.groceriesToGoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/groceries-to-go/create');
        }));

        it('should attach an Groceries to go to the controller scope', function () {
          expect($scope.vm.groceriesToGo._id).toBe(mockGroceriesToGo._id);
          expect($scope.vm.groceriesToGo._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/groceries-to-go/client/views/form-groceries-to-go.client.view.html');
        });
      });

      describe('Edit Route', function () {
        let editstate,
          GroceriesToGosController,
          mockGroceriesToGo;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('groceries-to-go.edit');
          $templateCache.put('modules/groceries-to-go/client/views/form-groceries-to-go.client.view.html', '');

          // create mock Groceries to go
          mockGroceriesToGo = new GroceriesToGosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Groceries to go Name'
          });

          // Initialize Controller
          GroceriesToGosController = $controller('GroceriesToGosController as vm', {
            $scope: $scope,
            groceriesToGoResolve: mockGroceriesToGo
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:groceriesToGoId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.groceriesToGoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            groceriesToGoId: 1
          })).toEqual('/groceries-to-go/1/edit');
        }));

        it('should attach an Groceries to go to the controller scope', function () {
          expect($scope.vm.groceriesToGo._id).toBe(mockGroceriesToGo._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/groceries-to-go/client/views/form-groceriesToGo.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
