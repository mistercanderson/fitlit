class Hydration {
  constructor(userID, hydrationData) {
    this.userID = userID;
    this.userData = hydrationData.filter(element => element.userID === userID);
  }

  calculateToalOunces() {
    const total = this.userData.reduce(function (sum, current) {
      return sum + current.numOunces
    }, 0);
    return total;
  }

  calculateDailyOunces(date) {
    const thisDay = this.userData.filter(point => point.date === date);
    if (thisDay) {
      return thisDay[0].numOunces;
    } else {
      return 'You don\'t have any hydration info from today'
    }
  }

  findDay(date) {
    const day = this.userData.find(dataPoint => dataPoint.date === date);
    return day;
  }

  calculateWeeklyOunces(endDate) {
    const day = this.findDay(endDate);
    const userData = this.userData.reverse()
    const index = userData.indexOf(day);
    const week = userData.splice(index, 7);
    const weeklyOunces = week.map(day => day.numOunces).reduce((a, b) => a + b);
    return weeklyOunces;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}