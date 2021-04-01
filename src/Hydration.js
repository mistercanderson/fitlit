class Hydration {
  constructor(userID, hydrationData) {
    this.userID = userID;
    this.userData = hydrationData.filter(element => element.userID === userID);
  }

  calculateToalOunces() {
    const total = this.userData.reduce(function(sum,current) {
      return sum + current.numOunces
  }, 0);
  return total;
  }

  calculateDailyOunces(date) {
    let thisDay;
 
    thisDay = this.userData.filter(element => element.date === date);
    return thisDay[0].numOunces;
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
    const weeklyOunces = week.map(({date, numOunces}) => ({date, numOunces}));
    return weeklyOunces;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}
