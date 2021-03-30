const chai = require('chai');
const expect = chai.expect;
const User = require('../src/User');

describe('User', () => {
  const user = new User;
  const user1 = {
    "id": 1,
    "name": "Shay Mitchel",
    "address": "809 Cherry Lane Trail, Minneapolis MN 55125",
    "email":"shay.mitchel@gmail.com",
    "strideLength": 4.5,
    "dailyStepGoal": 10000,
    "friends": [
      19,
      9,
      31,
    ]
  };
  console.log(user) 

  it('should be a function', () => {
    expect(User).to.be.a('function'); 
  });

  it('should be an instance of User', () => {
    expect(user).to.be.an instanceof(User);
  });

  it.skip('should have an id', () => {
    expect(user.id).to.equal(1);
  });

  it.skip('should store a name', () => {
    expect(user.name).to.equal('Shay Mitchel');
  });

  it.skip('should have a registered email address', () => {
    expect(user.email).to.equal('shay.mitchel@gmail.com')
  });

  it.skip('should have a an updated stride length', () => {
    expect(user.name).to.equal('Shay Mitchel')
  });

  it.skip('should have a daily step goal', () => {
    expect(user.name).to.equal('Shay Mitchel')
  });

  it.skip('should have a list of friends', () => {
    expect(user.name).to.equal('Shay Mitchel')
  });

  it.skip('should answer with their name', () => {
    user.sayName();
    expect(user.sayName()).to.be.equal('Shay');
  });
});