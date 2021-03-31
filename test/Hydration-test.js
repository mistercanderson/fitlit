const chai = require('chai');
const expect = chai.expect;

const Hydration = require('../src/Hydration');
const fakeHydrationData = require('../data/fakeHydrationData');

describe('Hydration', () => {

  const hydration = new Hydration(1, fakeHydrationData);

  it('should be an instance of Hydration', () => {
    expect(hydration).to.be.an.instanceOf(Hydration);
  });

  it.skip('should return the average fluid ounces consumed for all time', () => {
    expect(hydration.calculateToalOunces()).to.be.equal(565);
  });

  it('should know how many fluid ounces was consumed for a specific day', () => {
    expect(hydration.calculateDailyOunces("2019/06/15")).to.be.equal(95);
  });

  it('should return how many fluid ounces consumed each day over a week', () => {
    expect(hydration.calculateWeeklyOunces()).to.be.deep.equal([
      { date: '2019/06/15', numOunces: 95 },
      { date: '2019/06/16', numOunces: 50 },
      { date: '2019/06/17', numOunces: 20 },
      { date: '2019/06/18', numOunces: 80 },
      { date: '2019/06/19', numOunces: 60 },
      { date: '2019/06/20', numOunces: 90 },
      { date: '2019/06/21', numOunces: 100 }
    ]);
  });
});