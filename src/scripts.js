const cards = {
  user: document.getElementById('userCard'),
  activity: document.getElementById('activityTracker'),
  hydration: document.getElementById('hydrationStation'),
  sleep: document.getElementById('sleepHygiene')
}

const userGreeting = document.querySelector('.user-greeting');

const testUsers = new UserRepository(userData);

// const testUser = new User(testUsers.userList[0]);



window.addEventListener('load', displayWelcome);

function getRandomNum (array) {
  return Math.floor(Math.random() * array.length)
};

function displayWelcome() {
  let randomUser = userData[getRandomNum(userData)];
  let user = new User(randomUser);
  
  userGreeting.innerHTML += `
  <h1>Let's Get Physical, ${user.sayName()}!</h1>
  `
};

function displaySteps() {
  console.log(`${testUsers.allUsersAverageSteps()} average step goal amongst all users!`);
}