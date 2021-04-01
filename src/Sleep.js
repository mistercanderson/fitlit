class Sleep {
  constructor(userId, sleepData) {
    this.userId = userId;
    this.data = sleepData;
    this.userData = this.extractData();
  }

  extractData() {
    const userData = this.data.filter(user => user.userID === this.userId);
    return userData;
  }

  findDay(date) {
    const day = this.userData.find(dataPoint => dataPoint.date === date);
    return day
  }

  calculateSum(arrayOfNumbers) {
    return arrayOfNumbers.reduce((a, b) => a + b)
  }

  calculateAverage(arrayOfNumbers) {
    const average = this.calculateSum(arrayOfNumbers) / arrayOfNumbers.length;
    return Number(average.toFixed(1))
  }

  findDailyHours(date) {
    const day = this.findDay(date)
    if (day) {
      return day.hoursSlept
    } else {
      return 'Sorry, you don\'t have any sleep information from that day'
    }
  }

  calculateAverageHoursTotal() {
    const sleepHours = this.userData.map(dataPoint => dataPoint.hoursSlept);
    return this.calculateAverage(sleepHours)
  }

  calculateAverageHoursWeekly(endDate) {
    const day = this.findDay(endDate);
    if (day) {
      const userData = this.userData.reverse()
      const index = userData.indexOf(day);
      const week = userData.splice(index, 7);
      const weekHours = week.map(day => day.hoursSlept);
      return this.calculateAverage(weekHours)
    } else {
      return 'Sorry, you don\'t have sleep data from all the days within the range you entered.'
    }
  }

  findDailyQuality(date) {
    const day = this.findDay(date)
    if (day) {
      return day.sleepQuality
    } else {
      return 'Sorry, you don\'t have any sleep information from that day'
    }
  }

  calculateAverageQualityTotal() {
    const sleepQualities = this.userData.map(dataPoint => dataPoint.sleepQuality);
    return this.calculateAverage(sleepQualities)
  }

  calculateAverageQualityWeekly(endDate) {
    const day = this.findDay(endDate);
    if (day) {
      const userData = this.userData.reverse()
      const index = userData.indexOf(day);
      const week = userData.splice(index, 7);
      const weekQualities = week.map(day => day.sleepQuality);
      return this.calculateAverage(weekQualities)
    } else {
      return 'Sorry, you don\'t have sleep data from all the days within the range you entered.'
    }
  }

  calculateGlobalQualityAverage() {
    const globalSleepQualities = this.data.map(dataPoint => dataPoint.sleepQuality);
    return this.calculateAverage(globalSleepQualities)
  }

  getWeekDates(endDate) {
    const week = [];
    let day = Number(endDate.split('/')[2])
    for (let i = 0; i < 7; i++) {
      if (i) {
        day--
      }
      let date = endDate.split('/').splice(0, 2);
      date.push(String(day))
      date = date.join('/');
      week.push(date)
    }
    return week
  }

  getUserIds() {
    let users = this.data.map(point => point.userID);
    let userIds = users.sort().filter((user, index, arr) =>
      !index || user != arr[index - 1]);
    return userIds
  }

  findTopSleepersWeekly(date) {
    const week = this.getWeekDates(date);
    let weeklyData = [];
    const topSleepers = [];
    week.forEach(day => {
      weeklyData.push(this.data.filter(point => point.date === day));
    })
    weeklyData = weeklyData.flat()
    this.getUserIds().forEach(id => {
      let userGroup = weeklyData.filter(user => user.userID === id);
      let userQuality = userGroup.map(day => day.sleepQuality);
      let userAverage = this.calculateAverage(userQuality);
      if (userAverage > 3) {
        topSleepers.push(id)
      }
    })
    return topSleepers;
  }

  findDeepestSleepers(day) {
    const dailyData = this.data.filter(point => point.date === day);
    const userSleepHours = dailyData.map(point => point.hoursSlept);
    const highestTotal = Math.max(...userSleepHours);
    const deepestSleepers = []
    dailyData.forEach(point => {
      if (point.hoursSlept === highestTotal) {
        deepestSleepers.push(point.userID)
      }
    })
    return deepestSleepers;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}