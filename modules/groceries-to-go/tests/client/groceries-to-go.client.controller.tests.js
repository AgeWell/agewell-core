(function () {
  'use strict';

  describe('Groceries to gos Controller Tests', function () {
    // Initialize global variables
    var GroceriesToGosController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      GroceriesToGosService,
      mockGroceriesToGo;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _GroceriesToGosService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      GroceriesToGosService = _GroceriesToGosService_;

      // create mock Groceries to go
      mockGroceriesToGo = new GroceriesToGosService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Groceries to go Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Groceries to gos controller.
      GroceriesToGosController = $controller('Groceries to gosController as vm', {
        $scope: $scope,
        groceriesToGoResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleGroceriesToGoPostData;

      beforeEach(function () {
        // Create a sample Groceries to go object
        sampleGroceriesToGoPostData = new GroceriesToGosService({
          name: 'Groceries to go Name'
        });

        $scope.vm.groceriesToGo = sampleGroceriesToGoPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (GroceriesToGosService) {
        // Set POST response
        $httpBackend.expectPOST('api/groceries-to-go', sampleGroceriesToGoPostData).respond(mockGroceriesToGo);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Groceries to go was created
        expect($state.go).toHaveBeenCalledWith('groceries-to-go.view', {
          groceriesToGoId: mockGroceriesToGo._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/groceries-to-go', sampleGroceriesToGoPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Groceries to go in $scope
        $scope.vm.groceriesToGo = mockGroceriesToGo;
      });

      it('should update a valid Groceries to go', inject(function (GroceriesToGosService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/groceries-to-go\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('groceries-to-go.view', {
          groceriesToGoId: mockGroceriesToGo._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (GroceriesToGosService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/groceries-to-go\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Groceries to gos
        $scope.vm.groceriesToGo = mockGroceriesToGo;
      });

      it('should delete the Groceries to go and redirect to Groceries to gos', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/groceries-to-go\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('groceries-to-go.list');
      });

      it('should should not delete the Groceries to go and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
