const chai = require('chai');
const expect = chai.expect;
const User = require('../src/User');
const fakeData = require('../data/fakeData');

describe('User', () => {
  const user1 = new User(fakeData[0]);

  it('should be a function', () => {
    expect(User).to.be.a('function'); 
  });

  it('should be an instance of User', () => {
    expect(user1).to.be.an.instanceof(User);
  });

  it('should have an id', () => {
    expect(user1.id).to.equal(1);
  });  

  it('should store a name', () => {
    expect(user1.name).to.equal('Shay Mitchel');
  });

  it('should have an address', () => {
    expect(user1.address).to.equal('809 Cherry Lane Trail, Minneapolis, MN 55125');
  });

  it('should have a registered email address', () => {
    expect(user1.email).to.equal('bad.and.boujee@gmail.com');
  });

  it('should have a an updated stride length', () => {
    expect(user1.strideLength).to.equal(4.5);
  });

  it('should have a daily step goal', () => {
    expect(user1.dailyStepGoal).to.equal(10000);
  });

  it('should have a list of friends', () => {
    expect(user1.friends).to.deep.equal([19, 9, 31]);
  });

  it('should answer with their name', () => {

    user1.sayName();
    expect(user1.sayName()).to.deep.equal('Shay');
  });
}); 