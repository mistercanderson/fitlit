const userRepo = new UserRepository(userData);
const currentUser = new User(userRepo.userList[0]);

const cards = {
  user: document.getElementById('userCard'),
  activity: document.getElementById('activityTracker'),
  hydration: document.getElementById('hydrationStation'),
  sleep: document.getElementById('sleepHygiene')
}

function displayUserInfo(user) {
  const userKeys = Object.keys(user);
  userKeys.forEach(key => {
    let currentElement = document.getElementById(key)
    switch (key) {
      case 'address':
        const address = user[key].split('-')[0];
        currentElement.innerText += ` ${address}`
        break
      case 'friends':
        const friendNumbers = user[key];
        const userList = userRepo.userList;
        const friends = friendNumbers.map(friendNumber => 
          userList[friendNumber - 1].name);
        currentElement.innerText += ` ${friends.join(', ')}`
        break;
      case 'id':
        break
      default:
        currentElement.innerText += ` ${user[key]}`
    }
  })
}