const chai = require('chai');
const expect = chai.expect;
const User = require('../src/User');

describe('User', () => {
  beforeEach( () => {
    const user = new User;
  });

  it('should be a function', () => {
    expect(User).to.be.a('function'); 
  });

  it('should be an instance of User', () => {
    expect(user).to.be.an instanceof(User);
  });
});