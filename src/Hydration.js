class Hydration {
  constructor(userID, hydrationData) {
    this.userID = userID;
    this.userData = hydrationData.filter(element => element.userID === userID);
  }

  calculateDailyOunces(date) {
    let thisDay;
 
    thisDay = this.userData.filter(element => element.date === date);
    console.log(thisDay)
    return thisDay[0].numOunces;
  }
}



if (typeof module !== 'undefined') {
  module.exports = Hydration;
}