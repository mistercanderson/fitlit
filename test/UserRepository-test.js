const chai = require('chai');
const expect = chai.expect;
const UserRepository = require('../src/UserRepository');
const User = require('../src/User');
const fakeData = require('../data/fakeData');

describe('UserRepository', () => {
  let userRepo;

  beforeEach(() => {
    userRepo = new UserRepository(fakeData);
  });

  it('should be an instance of UserRepository', () => {
    expect(userRepo).to.be.an.instanceOf(UserRepository);
  });

  it('should track a list of User instances', () => {
    expect(userRepo.userList).to.be.equal(fakeData);
  }); 
  
  it('should return a user\'s data based off of their ID', () => {
    userRepo.returnUserData(1);
    expect(userRepo.returnUserData(1)).to.be.equal(fakeData[0]);
  });

  it('should return the average step goal amogst all users', () => {
    userRepo.allUsersAverageSteps();
    expect(userRepo.allUsersAverageSteps()).to.be.equal(10000);
  }); 

  it('should hold instances of User class in its userList', () => {
    userRepo.convertUserList();

    expect(userRepo.userList[0]).to.be.an.instanceof(User)
  })
});