class Activity {
  constructor(userId, activityData, userInformation) {
    this.userId = userId;
    this.activityData = activityData;
    this.userInformation = userInformation;
    this.userCount = userInformation.length;
    this.userData = this.extractData();
  }

  extractData() {
    const userData = this.activityData.filter(user => user.userID === this.userId);
    return userData;
  }

  findCurrentUser() {
    const userInformation = this.userInformation.filter(user => user.id === this.userId);
    return userInformation;
  }

  // There are 5,280 feet per mile - used user stride length to find number steps per mile (date's num steps/(num steps per mile))
  calculateDailyMiles(date) {
    const currentUser = this.findCurrentUser();
    const userStride = currentUser[0].strideLength;
    const currentDateData = this.userData.filter(user => user.date === date);
    const numStepsPerMile = currentDateData[0].numSteps;
    const calculateMiles = numStepsPerMile / (5280/userStride);
    return calculateMiles.toFixed(1);
  }

  findDailySteps(date) {
    return this.findDay(date).numSteps;
  }

  calculateDailyMinutes(date) {
    let minutesActive = this.userData.filter(user => user.date === date);
    // console.log(this.userInformation)
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

  confirmCurrentStepGoal(date) {
    const userStepGoal = this.findStepGoal();
    const day = this.findDay(date);
    const stepsThatDay = day.numSteps;
    return stepsThatDay > userStepGoal ? true : false;
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
  
  // All users' average 
  extractAllUsersDataByDate(date) {
    const allUserData = this.activityData.filter(user => user.date === date);
    return allUserData;
  }

  findAllUsersStairsAverage(date) {
    const allUserData = this.extractAllUsersDataByDate(date);
    const total = allUserData.reduce( (sum, current) => {
      return sum + current.flightsOfStairs;
    }, 0);
    const stairAverage = total/this.userCount;
    return stairAverage.toFixed(1);
  }

  findAllUsersStepsAverage(date) {
    const allUserData = this.extractAllUsersDataByDate(date);
    const total = allUserData.reduce( (sum, current) => {
      return sum + current.numSteps;
    }, 0);
    const stepAverage = total/this.userCount;
    return stepAverage.toFixed(1);
  }
  
  finAllUsersMinutesAverage(date) {
    const allUserData = this.extractAllUsersDataByDate(date);
    const total = allUserData.reduce( (sum, current) => {
      return sum + current.minutesActive;
    }, 0);
    const stepAverage = total/this.userCount;
    return stepAverage.toFixed(1);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}