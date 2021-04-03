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

  it('should calculate the number of steps, in miles, for any given day', () => {
    expect(activity.calculateDailyMiles('2019/06/15')).to.be.deep.equal('3.0');
  });

  it('should return how many minutes a user spent being active in a day', () => {
    expect(activity.calculateDailyMinutes('2019/06/15')).to.be.equal(140);
  });

  it('should extract how many minutes a user spent being active in any week', () => {
    expect(activity.findWeeklyMinutes('2019/06/21')).to.be.deep.equal([
      { date: '2019/06/21', minutesActive: 90 },
      { date: '2019/06/20', minutesActive: 70 },
      { date: '2019/06/19', minutesActive: 237 },
      { date: '2019/06/18', minutesActive: 68 },
      { date: '2019/06/17', minutesActive: 116 },
      { date: '2019/06/16', minutesActive: 138 },
      { date: '2019/06/15', minutesActive: 140 }
    ]);
  });
  
  it('should confirm if their step goal was reached for that day', () => {
    expect(activity.confirmCurrentStepGoal('2019/06/19')).to.be.equal(false);
    expect(activity.confirmCurrentStepGoal('2019/06/20')).to.be.equal(true);
  });

  it('should return all days exceeding their daily step goal', () => {
    expect(activity.extractAchievedStepDays(activityData)).to.be.deep.equal([
      { date: '2019/06/21', numSteps: 14419 },
      { date: '2019/06/20', numSteps: 13948 },
    ]);
  });

  it('should extract a user\'s all time flight of stairs climbed record', () => {
    expect(activity.findAllTimeStairs(activityData)).to.be.equal(35);
  });

  it('should calculate the average stairs climbed for all user\'s on any given day', () => {
    expect(activity.findAllUsersStairsAverage("2019/06/15")).to.be.equal('20.3');
  });

  it('should calculate the average steps taken for all user\'s on any given day', () => {
    expect(activity.findAllUsersStepsAverage("2019/06/15")).to.be.equal('6145.7');
  });

  it('should calculate the average minutes active for all user\'s on any given day', () => {
    expect(activity.finAllUsersMinutesAverage("2019/06/15")).to.be.equal('155.7');
  });
});