class Hydration {
  constructor(userID, data) {
    this.userID = userID;
    this.filterData = data.filter(element => element.userID === userID);
  }

  ouncesThatDay(date) {
    let thisDay;
 
    thisDay = this.filterData.filter(element => element.date === date);
    return thisDay[0].numOunces;
  }
}



if (typeof module !== 'undefined') {
  module.exports = Hydration;
}