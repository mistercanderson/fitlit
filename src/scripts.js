const cards = {
  user: document.getElementById('userCard'),
  activity: document.getElementById('activityTracker'),
  hydration: document.getElementById('hydrationStation'),
  sleep: document.getElementById('sleepHygiene')
}

const userGreeting = document.querySelector('.user-greeting');

const testUsers = new UserRepository(userData);

const testUser = new User(testUsers.userList[0]);


function displaySteps() {
  console.log(`${testUsers.allUsersAverageSteps()} average step goal amongst all users!`);
}