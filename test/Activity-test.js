const chai = require('chai');
const expect = chai.expect;

const Activity = require('../src/Activity');
const User = require('../src/User');
const activityData = require('../data/fakeActivityData');
const userData = require('../data/fakeUserData');

describe('Activity', () => {
  let user1;
  let activity;
              
  beforeEach(() => {
    user1 = new User(userData[0]);
    activity = new Activity(user1.id, activityData, userData);
  });

  it('should be an instance of Activity', () => {
    expect(activity).to.be.an.instanceOf(Activity);
  });
  it.skip('should calculate the number of steps for any specific day', () => {
    // 5280/4.5 = 1,173 num steps per mile >> 3577/1173
    expect(activity.calculateDailySteps('2019/06/15')).to.be.deep.equal(3.0);
  });

  it('should return how many minutes a user spent being active in a day', () => {
    expect(activity.calculateDailyMinutes('2019/06/15')).to.be.equal(140);
  });

  it.only('should extract how many minutes a user spent being active in any week', () => {
    expect(activity.findWeeklyMinutess('2019/06/21')).to.be.deep.equal([
      { date: '2019/06/21', minutesActive: 90 },
      { date: '2019/06/20', minutesActive: 70 },
      { date: '2019/06/19', minutesActive: 237 },
      { date: '2019/06/18', minutesActive: 68 },
      { date: '2019/06/17', minutesActive: 116 },
      { date: '2019/06/16', minutesActive: 138 },
      { date: '2019/06/15', minutesActive: 140 }
    ]);
  });

  it('should confirm if their step goal was reached for any day', () => {
    expect(activity.confirmStepGoal(1, '2019/06/19')).to.be.equal(false);
    expect(activity.confirmDailyStepGoal(1, '2019/06/20')).to.be.equal(true);
  });

  it.skip('should return all days exceeding their goal', () => {
    expect(activity.confirmAllStepGoal(1, activityData)).to.be.equal("2019/06/20", '2019/06/21');
  });

  it.skip('should extract their all time record', () => {
    expect(activity.findStepRecord(1, activityData)).to.be.equal("2019/06/21");
  });

  it.skip('should calculate all user\'s average stairs climbed for any given day', () => {
    expect(activity.findAverageStairsForAll("2019/06/15")).to.be.equal(61);
  });

  it.skip('should calculate all user\'s average steps taken for any given day', () => {
    expect(activity.findAverageStepsForAll("2019/06/15"), activityData).to.be.equal(6145.7);
  });

  it.skip('should calculate all user\'s average minutes active for any give day', () => {
    expect(activity.findAverageMinsForAll("2019/06/15")).to.be.equal(155.7);
  });
});