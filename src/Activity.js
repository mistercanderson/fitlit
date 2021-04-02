const User = require("./User");

class Activity {
  constructor(userId, activityData, userData) {
    this.userId = userId;
    this.activityData = activityData;
    this.userData = userData;
  }

  extractData(user) {
    const userData = this.activityData.filter(user => user.userId === this.userId);
    return userData;
  }

  extractStride(user) {
    const userStride = this.userData.filter(user => user.id === this.userId);
    return userStride[0].strideLength;
    };
    

  calculateDailySteps(date) {
    let userData = this.extractData();
    let userStride = this.extractStride();
    let currentDateData = userData.filter(user => user.date === date);
    let numSteps = currentDateData[0].numSteps;
    let calculateMiles = numSteps / (5280/userStride);
    let roundMiles = calculateMiles.toFixed(1);         
    return roundMiles;
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

  findWeeklyMinutess(endDate) {
    const day = this.findDay(endDate);
    console.log(endDate)
    const userData = this.activityData.reverse()
    const index = userData.indexOf(day);
    const week = userData.splice(index, 7);
    const weeklyMiles = week.map(({date, minutesActive}) => ({date, minutesActive}));
    return weeklyMiles;
  }

}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}