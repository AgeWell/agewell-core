'use strict';

describe('Volunteers E2E Tests:', function () {
  describe('Test Volunteers page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/volunteers');
      expect(element.all(by.repeater('volunteer in volunteers')).count()).toEqual(0);
    });
  });
});
