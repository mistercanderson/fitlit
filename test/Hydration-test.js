const chai = require('chai');
const expect = chai.expect;

const Hydration = require('../src/Hydration');
const fakeData2 = require('../data/fakeData2');

describe('Hydration', () => {

  const hydration = new Hydration(1, fakeData2);

  it('should be an instance of Hydration', () => {
    expect(hydration).to.be.an.instanceOf(Hydration);
  });

  it.skip('should return the average fluid ounces consumed for all time', () => {
    expect(hydration.calculateToalOunces()).to.be.equal(495);
  });

  it('should know how many fluid ounces was consumed for a specific day', () => {
    expect(hydration.calculateDailyOunces("2019/06/15")).to.be.equal(95);
  });

  it.skip('should return how many fluid ounces consumed each day over a week', () => {
    expect(hydration.calculateWeeklyOunces()).to.be.equal(495);
  });
});