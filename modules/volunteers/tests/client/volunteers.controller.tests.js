(function () {
  'use strict';

  describe('Volunteers Controller Tests', function () {
    // Initialize global variables
    let VolunteersController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      VolunteersService,
      mockVolunteer;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _VolunteersService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      VolunteersService = _VolunteersService_;

      // create mock Volunteer
      mockVolunteer = new VolunteersService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Volunteer Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Volunteers controller.
      VolunteersController = $controller('VolunteersController as vm', {
        $scope: $scope,
        volunteerResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      let sampleVolunteerPostData;

      beforeEach(function () {
        // Create a sample Volunteer object
        sampleVolunteerPostData = new VolunteersService({
          name: 'Volunteer Name'
        });

        $scope.vm.volunteer = sampleVolunteerPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (VolunteersService) {
        // Set POST response
        $httpBackend.expectPOST('api/volunteers', sampleVolunteerPostData).respond(mockVolunteer);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Volunteer was created
        expect($state.go).toHaveBeenCalledWith('volunteers.view', {
          volunteerId: mockVolunteer._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        let errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/volunteers', sampleVolunteerPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Volunteer in $scope
        $scope.vm.volunteer = mockVolunteer;
      });

      it('should update a valid Volunteer', inject(function (VolunteersService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/volunteers\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('volunteers.view', {
          volunteerId: mockVolunteer._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (VolunteersService) {
        let errorMessage = 'error';
        $httpBackend.expectPUT(/api\/volunteers\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Volunteers
        $scope.vm.volunteer = mockVolunteer;
      });

      it('should delete the Volunteer and redirect to Volunteers', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/volunteers\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('volunteers.list');
      });

      it('should should not delete the Volunteer and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
