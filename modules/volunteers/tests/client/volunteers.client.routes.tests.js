(function () {
  'use strict';

  describe('Volunteers Route Tests', function () {
    // Initialize global variables
    var $scope,
      VolunteersService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _VolunteersService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      VolunteersService = _VolunteersService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('volunteers');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/volunteers');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          VolunteersController,
          mockVolunteer;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('volunteers.view');
          $templateCache.put('modules/volunteers/client/views/view-volunteer.client.view.html', '');

          // create mock Volunteer
          mockVolunteer = new VolunteersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Volunteer Name'
          });

          // Initialize Controller
          VolunteersController = $controller('VolunteersController as vm', {
            $scope: $scope,
            volunteerResolve: mockVolunteer
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:volunteerId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.volunteerResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            volunteerId: 1
          })).toEqual('/volunteers/1');
        }));

        it('should attach an Volunteer to the controller scope', function () {
          expect($scope.vm.volunteer._id).toBe(mockVolunteer._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/volunteers/client/views/view-volunteer.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          VolunteersController,
          mockVolunteer;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('volunteers.create');
          $templateCache.put('modules/volunteers/client/views/form-volunteer.client.view.html', '');

          // create mock Volunteer
          mockVolunteer = new VolunteersService();

          // Initialize Controller
          VolunteersController = $controller('VolunteersController as vm', {
            $scope: $scope,
            volunteerResolve: mockVolunteer
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.volunteerResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/volunteers/create');
        }));

        it('should attach an Volunteer to the controller scope', function () {
          expect($scope.vm.volunteer._id).toBe(mockVolunteer._id);
          expect($scope.vm.volunteer._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/volunteers/client/views/form-volunteer.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          VolunteersController,
          mockVolunteer;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('volunteers.edit');
          $templateCache.put('modules/volunteers/client/views/form-volunteer.client.view.html', '');

          // create mock Volunteer
          mockVolunteer = new VolunteersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Volunteer Name'
          });

          // Initialize Controller
          VolunteersController = $controller('VolunteersController as vm', {
            $scope: $scope,
            volunteerResolve: mockVolunteer
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:volunteerId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.volunteerResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            volunteerId: 1
          })).toEqual('/volunteers/1/edit');
        }));

        it('should attach an Volunteer to the controller scope', function () {
          expect($scope.vm.volunteer._id).toBe(mockVolunteer._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/volunteers/client/views/form-volunteer.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
