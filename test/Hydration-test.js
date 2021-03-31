const chai = require('chai');
const expect = chai.expect;

const Hydration = require('../src/Hydration');
const fakeData2 = ('..data/fakeData2')

describe('Hydration', () => {
  const hydration = new Hydration();

  it.skip('should be an instance of Hydration', () => {
    expect(hydration).to.be.an.instanceOf(Hydration);
  });

  it.skip('should return the average fluid ounces consumed for all time', () => {
    hydration.totalOunces();
    expect(hydration.totalOunces()).to.be.equal(495);
  });

  it.skip('should know how many fluid ounces was consumed for a specific day', () => {
    hydration.ouncesToday(date);
    expect(hydration.ouncesToday()).to.be.equal(95)
  });

  it.skip('should return how many fluid ounces consumed each day over a week', () => {
    hydration.weeklyHydration();
    expect(hydration.weeklyHydration()).to.be.equal(495);
  });
});