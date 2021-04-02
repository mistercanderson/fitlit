const chai = require('chai');
const expect = chai.expect;
const Sleep = require('../src/Sleep.js');
const sleepData = require('../data/fakeSleep.js');
const userData = require('../data/fakeUserData.js');
const User = require('../src/User.js');

describe('Sleep', () => {
  let user1;
  let sleep;
  
  beforeEach(() => {
    user1 = new User(userData[0]);
    sleep = new Sleep(user1.id, sleepData)
  });

  it('should be a function', () => {
    expect(Sleep).to.be.a('function');
  });

  it('should be an instance of Sleep', () => {
    expect(sleep).to.be.an.instanceof(Sleep);
  });

  it('should store sleep data and a user ID', () => {
    expect(sleep.data).to.deep.equal(sleepData);
    expect(sleep.userId).to.equal(user1.id);
  });

  it('should be able to extract a user\'s sleep data from the rest of the sleep data', () => {
    const extractedData = sleep.extractData();

    expect(sleep.userData).to.be.an('Array');
    expect(extractedData).to.deep.equal(sleep.userData);
  })

  it('should find the number of hours a user slept on a certain day', () => {
    const hoursSlept = sleep.findDailyHours("2019/06/15");
    const wrongHoursSlept = sleep.findDailyHours("1976/03/31");

    expect(hoursSlept).to.equal(5);
    expect(wrongHoursSlept).to.equal('Sorry, you don\'t have any sleep information from that day')
  });

  it('should calculate the average hours a user has slept over all time', () => {
    const totalHoursAverage = sleep.calculateAverageHoursTotal();

    expect(totalHoursAverage).to.equal(6.7)
  });

  it('should calculate the average hours a user slept over the course of a week', () => {
    const weeklyHoursAverage = sleep.calculateAverageHoursWeekly("2019/06/21");

    expect(weeklyHoursAverage).to.equal('Sorry, you don\'t have sleep data from all the days within the range you entered.');
    const sleep2 = new Sleep(2, sleepData);
    const weeklyHoursAverage2 = sleep2.calculateAverageHoursWeekly("2019/06/21");

    expect(weeklyHoursAverage2).to.equal(10);
  });

  it('should find the sleep quality a user had on a certain day', () => {
    const sleepQuality = sleep.findDailyQuality("2019/06/15");
    const wrongSleepQuality = sleep.findDailyQuality("1976/03/31");

    expect(sleepQuality).to.equal(2);
    expect(wrongSleepQuality).to.equal('Sorry, you don\'t have any sleep information from that day')
  });

  it('should calculate the average sleep quality a user has had over all time', () => {
    const totalQualityAverage = sleep.calculateAverageQualityTotal(sleep.userId);

    expect(totalQualityAverage).to.equal(2.7)
  });

  it('should calculate the average sleep quality a user had over the course of a week', () => {
    const weeklyQualityAverage = sleep.calculateAverageQualityWeekly("2019/06/21");

    expect(weeklyQualityAverage).to.equal('Sorry, you don\'t have sleep data from all the days within the range you entered.');
    const sleep2 = new Sleep(2, sleepData);
    const weeklyQualityAverage2 = sleep2.calculateAverageQualityWeekly("2019/06/21");

    expect(weeklyQualityAverage2).to.equal(1);
  });

  it('should be able to calculate the average sleep quality for all users', () => {
    const globalAverage = sleep.calculateGlobalQualityAverage();

    expect(globalAverage).to.equal(2.5)
  });

  it('should be able to find the id of all users with an average sleep quality over 3 in any given week', () => {
    const topSleepers = sleep.findTopSleepersWeekly("2019/06/21");
    
    expect(topSleepers).to.be.an('Array');
    expect(topSleepers).to.deep.equal([3]);
  });

  it('should find the sleepiest user(s) on any given date', () => {
    const sleepyGuy1 = sleep.findDeepestSleepers("2019/06/15");

    expect(sleepyGuy1).to.deep.equal([3]);

    const sleepyGuy2 = sleep.findDeepestSleepers("2019/06/16");

    expect(sleepyGuy2).to.deep.equal([2, 3])
  });
})