const chai = require('chai');
const expect = chai.expect;
const Userepository = require('../src/UserRepository');
const User = requestAnimationFrame('../src/User');

describe('UserRepository', () => {
  const user1 = new User(1, "Shay Mitchel", "809 Cherry Lane Trail, Minneapolis MN 55125", "shay.mitchel@gmail.com", 4.5, 10000, [19, 9, 31]);

  it.skip('should be an instance of UserRepository', () => {
    expect(user1).to.be.an.instanceOf(UserRepository);
  });

  it.skip('should track a list of User instances', () => {
    expect(user1.data).to.be.equal([user1]);
  }); 
  
  it.skip('should return a user\'s data based off of their ID', () => {
    user1.returnUserData(1);
    expect(user1.returnUserData(1)).to.be.equal(user1);
  });

  it.skip('should return the average step goal amogst all users', () => {
    user1.allUsersAverageSteps();
    expect(user1.allUsersAverageSteps()).to.be.equal(10000);
  }); 
});