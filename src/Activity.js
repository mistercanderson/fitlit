const User = require("./User");

class Activity {
  constructor(userId, activityData, userInformation) {
    this.userId = userId;
    this.activityData = activityData;
    this.userInformation = userInformation;
    this.userData = this.extractData();
  }

  extractData() {
    const userData = this.activityData.filter(user => user.userId === this.userId);
    return userData;
  }

  findCurrentUser() {
    const userInformation = this.userInformation.filter(user => user.id === this.userId);
    return userInformation;
  }

  calculateDailyMiles(date) {
    const currentUser = this.findCurrentUser();
    const userStride = currentUser[0].strideLength;
    const currentDateData = this.userData.filter(user => user.date === date);
    const numStepsPerMile = currentDateData[0].numSteps;
    const calculateMiles = numStepsPerMile / (5280/userStride);
    return calculateMiles.toFixed(1);
  }

  calculateDailyMinutes(date) {
    let minutesActive = this.userData.filter(user => user.date === date);
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
    const copyUserData = [...userData];
    const week = copyUserData.splice(index, 7);
    const weeklyMiles = week.map(({date, minutesActive}) => ({date, minutesActive}));
    return weeklyMiles;
  }

  findStepGoal() {
    const userData = this.findCurrentUser();
    const userStepGoal = userData[0].dailyStepGoal;
    return userStepGoal;
  }

  confirmCurrentStepGoal(endDate) {
    const userStepGoal = this.findStepGoal();
    const day = this.findDay(endDate);
    const blah = day.numSteps;
    return blah > userStepGoal ? true : false;
  }

  extractAchievedStepDays() {
    const userStepGoal = this.findStepGoal();
    const achievedDays = this.userData.filter(steps => steps.numSteps > userStepGoal);
    const days = achievedDays.map(({date, numSteps}) =>({date, numSteps}))
    return days;
  }

  findAllTimeStairs() {
    const numOfStairs = Math.max.apply(Math, this.userData.map(o => o.flightsOfStairs));
    return numOfStairs;
  }

  findAllUsersStairsAverage(date) {
    const userCount = this.userInformation.length;
    const allUserData = this.activityData.filter(user => user.date === date);
    const total = allUserData.reduce( (sum, current) => {
      return sum + current.flightsOfStairs;
    }, 0);
    const stairAverage = total/userCount;
    return stairAverage.toFixed(1);
  }

  findAllUsersStepsAverage(date) {
    const userCount = this.userInformation.length;
    const allUserData = this.activityData.filter(user => user.date === date);
    const total = allUserData.reduce( (sum, current) => {
      return sum + current.numSteps;
    }, 0);
    const stepAverage = total/userCount;
    return stepAverage.toFixed(1);
  }
  
  finAllUsersMinutesAverage(date) {
    const userCount = this.userInformation.length;
    const allUserData = this.activityData.filter(user => user.date === date);
    const total = allUserData.reduce( (sum, current) => {
      return sum + current.minutesActive;
    }, 0);
    const stepAverage = total/userCount;
    return stepAverage.toFixed(1);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}