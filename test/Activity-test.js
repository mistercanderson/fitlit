const chai = require('chai');
const expect = chai.expect;

const Activity = require('../src/Activity');
const fakeActivityData = require('../data/fakeActivityData');
const fakeUserData = require('../data/fakeUserData');
const Hydration = require('../src/Hydration');

describe('Activity', () => {
  const activity = new Activity(fakeActivityData, fakeUserData);
  //WOULD IT MAKE SENSE TO PASS THROUGH THE USER DATA?

  it.skip('should be an instance of Activity', () => {
    expect(activity).to.be.an.instanceOf(Hydration);
  })
  it.skip('should calculate the number of steps for any specific day', () => {
    // 5280/4.5 = 1,173 num steps per mile >> 3577/1173
    expect(activity.calculateDailySteps('2019/06/15')).to.be.equal(3)
  });

  it.skip('should return how many minutes a user spent being active in a day', () => {
    expect(activity.calculateDailyMinutes(1, '2019/06/15')).to.be.equal(140);
  });

  it.skip('should extract how many minutes a user spent being active in any week', () => {
    
  });

  it.skip('should confirm if their step goal was reached for any day', () => {

  });

  it.skip('should return all days exceeding their goal', () => {

  });

  it.skip('should extract their all time record', () => {

  });

  it.skip('should calculate all the user\'s average stairs climbed for any given day', () => {

  });

  it.skip('should calculate all the user\'s average steps taken for any given day', () => {

  });

  it.skip('should calculate all the user\'s average minutes active for any give day', () => {

  });
});