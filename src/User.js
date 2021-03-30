class User {
  constructor(id, name, address, email, strideLength, dailyStepGoal, friends) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.email = email;
    this.strideLength = strideLength;
    this.dailyStepGoal = dailyStepGoal;
    this.friends = friends;
  }

  sayName() {
    const firstName = this.name.split(' ').slice(0, 1).join(' ');
    return firstName;
  }
};

module.exports = User; 