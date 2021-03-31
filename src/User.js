class User {
  constructor({ id, name, address, email, strideLength, dailyStepGoal, friends }) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.email = email;
    this.strideLength = strideLength;
    this.dailyStepGoal = dailyStepGoal;
    this.friends = friends;
  }

  sayName() {
    const firstName = this.name.split(' ')[0];
    return firstName;
  }
};

if (typeof module !== 'undefined') {
  module.exports = User;
}
// export default User;