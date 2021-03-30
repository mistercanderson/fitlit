const chai = require('chai');
const expect = chai.expect;
const UserRepository = require('../src/UserRepository');
// const User = require('../src/User');

describe('UserRepository', () => {
  // let userRepo;
  // const fakeData = [
  //   {
  //     "id": 1,
  //     "name": "Shay Mitchel",
  //     "address": "809 Cherry Lane Trail, Minneapolis MN 55125",
  //     "email": "bad.and.boujee@gmail.com",
  //     "strideLength": 4.5,
  //     "dailyStepGoal": 10000,
  //     "friends": [19, 9, 31]
  //   }
  // ];
  beforeEach((done) => {

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
    userRepo = new UserRepository(fakeData);
    
    // done();
    return console.log('made it')
    .end(done)
  });
 
  // const user1 = new User(1, "Shay Mitchel", "809 Cherry Lane Trail, Minneapolis MN 55125", "shay.mitchel@gmail.com", 4.5, 10000, [19, 9, 31]);

  it('should be an instance of UserRepository', () => {
    expect(userRepo).to.be.an.instanceOf(UserRepository);
  });

  it.skip('should track a list of User instances', () => {
    expect(userRepo.data).to.be.equal(fakeData);
  }); 
  
  it.skip('should return a user\'s data based off of their ID', () => {
    user1.returnUserData(1);
    expect(userRepo.returnUserData(1)).to.be.equal(fakeData[0]);
  });

  it.skip('should return the average step goal amogst all users', () => {
    user1.allUsersAverageSteps();
    expect(userRepo.allUsersAverageSteps()).to.be.equal(10000);
  }); 
});