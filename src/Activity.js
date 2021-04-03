const User = require("./User");

class Activity {
  constructor(userId, activityData, userData) {
    this.userId = userId;
    this.activityData = activityData;
    this.userData = userData;
  }

  extractData() {
    const userData = this.activityData.filter(user => user.userId === this.userId);
    return userData;
  }

  extractStride() {
    const userStride = this.userData.filter(user => user.id === this.userId);
    return userStride[0].strideLength;
    };
  
  calculateDailyMiles(date) {
    const userData = this.extractData();
    const userStride = this.extractStride();

    const currentDateData = userData.filter(user => user.date === date);
    const numStepsPerMile = currentDateData[0].numSteps;
    const calculateMiles = numStepsPerMile / (5280/userStride);
    return calculateMiles.toFixed(1);
  }

  calculateDailyMinutes(date) {
    let userData = this.extractData();

    let minutesActive = userData.filter(user => user.date === date);
    return minutesActive[0].minutesActive;
  }

  findDay(date) {
    const day = this.activityData.find(dataPoint => dataPoint.date === date);
    return day;
  }

  findWeeklyMinutes(endDate) {
    const day = this.findDay(endDate);
    const userData = this.activityData.reverse();
    const index = userData.indexOf(day);
    const week = userData.splice(index, 7);
    const weeklyMiles = week.map(({date, minutesActive}) => ({date, minutesActive}));
    return weeklyMiles;
  }

  findStepGoal() {
    const userData = this.userData.filter(user => user.id === this.userId);
    const userStepGoal = userData[0].dailyStepGoal;
    return userStepGoal;
  }

  confirmCurrentStepGoal(date) {
    const userStepGoal = this.findStepGoal();
    const stepsToday = this.findDay(date).numSteps;
    return stepsToday > userStepGoal ? true : false;
  }
  
  confirmAllStepGoal() {
    const userStepGoal = this.findStepGoal();
    const userData = this.extractData();
    const achievedDays = userData.filter(steps => steps.numSteps > userStepGoal);
    const days = achievedDays.map(({date, numSteps}) =>({date, numSteps}))
    return days;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}