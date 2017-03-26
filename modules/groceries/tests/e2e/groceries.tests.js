'use strict';

describe('Groceries to gos E2E Tests:', function () {
  describe('Test Groceries to gos page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/groceries');
      expect(element.all(by.repeater('groceries in groceries')).count()).toEqual(0);
    });
  });
});
