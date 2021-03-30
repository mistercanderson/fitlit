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
    this.userList.map((user) => {
      user = new User;
    })
  }
}

module.exports = UserRepository;