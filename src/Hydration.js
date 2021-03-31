class Hydration {
  constructor(userID, hydrationData) {
    this.userID = userID;
    this.userData = hydrationData.filter(element => element.userID === userID);
  }

  // calculateToalOunces() {
  //   const poop = this.userData(element => ({id: element.id}))
  //   console.log(poop)
  // }

  calculateDailyOunces(date) {
    let thisDay;
 
    thisDay = this.userData.filter(element => element.date === date);
    return thisDay[0].numOunces;
  }
  
  calculateWeeklyOunces() {
    const lastWeekOunces = this.userData.splice(-7, 7);
    const res = lastWeekOunces.map(({date, numOunces}) => ({date, numOunces}));
    return res;
  }


}


if (typeof module !== 'undefined') {
  module.exports = Hydration;
}

//remove user ID and format date