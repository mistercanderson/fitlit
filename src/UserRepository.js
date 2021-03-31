// const User = require('../src/User');
// import User from '../src/User';

class UserRepository {
  constructor(users) {
    this.userList = users;
  }

  returnUserData(userID) {
    const user = this.userList.find(user => user.id === userID);
    return user;
  }

  allUsersAverageSteps() {
    let sum = this.userList.reduce((acc, user) => {
      return acc + user.dailyStepGoal;
  }, 0);
  return sum / this.userList.length;
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}