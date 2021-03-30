const User = require('../src/User');

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

  convertUserList() {
    this.userList = this.userList.map((user) => {
      let { id, name, address, email, strideLength, dailyStepGoal, friends } = user;
      user = new User(id, name, address, email, strideLength, dailyStepGoal,friends);
      return user;
    })
  }
}

module.exports = UserRepository;