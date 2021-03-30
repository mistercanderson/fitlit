class UserRepository {
  constructor(data) {
    this.data = data;
  }

  returnUserData(userID) {
    const user = this.data.find(user => user.id === userID);
    return user;
  }

  allUsersAverageSteps() {
    let sum = this.data.reduce((acc, user) => {
      return acc + user.dailyStepGoal;
  }, 0);
  return sum / this.data.length;
  }
}

module.export = UserRepository;