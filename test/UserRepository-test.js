const chai = require('chai');
const expect = chai.expect;
const UserRepository = require('../src/UserRepository');


describe('UserRepository', () => {
  let userRepo;
  const fakeData = [
    {
      "id": 1,
      "name": "Shay Mitchel",
      "address": "809 Cherry Lane Trail, Minneapolis MN 55125",
      "email": "bad.and.boujee@gmail.com",
      "strideLength": 4.5,
      "dailyStepGoal": 10000,
      "friends": [19, 9, 31]
    }
  ];
  
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
});