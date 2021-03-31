const cards = {
  user: document.getElementById('userCard'),
  activity: document.getElementById('activityTracker'),
  hydration: document.getElementById('hydrationStation'),
  sleep: document.getElementById('sleepHygiene')
}

const userGreeting = document.querySelector('.user-greeting');
const userAverageSteps = document.querySelector('.user-average-steps');
const testUsers = new UserRepository(userData);

window.addEventListener('load', displayWelcome);

const getRandomNum = (array) => {
  return Math.floor(Math.random() * array.length)
};

const returnCurrentUser = () => {
  let randomUser = userData[getRandomNum(userData)];
  let user = new User(randomUser);
  return user;
};

function displayWelcome() {
  let user = returnCurrentUser();

  userGreeting.innerHTML += `
  <h1>Let's Get Physical, ${user.sayName()}!</h1>
  <h2>${testUsers.allUsersAverageSteps()} is the average step goal amongst all users.</h2>
  `
};

function displayWelcome() {
  let user = returnCurrentUser();

  userGreeting.innerHTML += `
  <h1>Let's Get Physical, ${user.sayName()}!</h1>
  <h2>${testUsers.allUsersAverageSteps()} is the average step goal amongst all users.</h2>
  `
};
