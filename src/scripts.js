const userRepo = new UserRepository(userData);
const currentUser = new User(userRepo.userList[0]);

const cards = {
  user: document.getElementById('userCard'),
  activity: document.getElementById('activityTracker'),
  hydration: document.getElementById('hydrationStation'),
  sleep: document.getElementById('sleepHygiene')
}

const profileTab = document.getElementById('profileTab');

window.addEventListener('click', (event) => displayUserInfo(currentUser, event))

function displayUserInfo(user, event) {
  const userKeys = Object.keys(user);
  userKeys.forEach(key => {
    let currentElement = document.getElementById(key)
    switch (key) {
      case 'address':
        currentElement.innerText = ''
        const address = user[key].split('-')[0];
        currentElement.innerText += `${removeCamelCase(key)}: ${address}`
        break
      case 'friends':
        currentElement.innerText = ''
        const friendNumbers = user[key];
        const userList = userRepo.userList;
        const friends = friendNumbers.map(friendNumber =>
          userList[friendNumber - 1].name);
        currentElement.innerText += `${removeCamelCase(key)}: ${friends.join(', ')}`
        break;
      case 'id':
        break
      default:
        currentElement.innerText = ''
        currentElement.innerText += `${removeCamelCase(key)}: ${user[key]}`
    };
  });
  userProfileToggle(event)
}

function userProfileToggle(event) {
  const cardKeys = Object.keys(cards);
  switch (event.target.id) {
    case 'profileTab':
      cardKeys.forEach(cardKey => {
        if (cardKey === 'user') {
          cards[cardKey].classList.remove('hidden')
        } else {
          cards[cardKey].classList.add('hidden')
        }
      })
      break;
    case 'closeButton':
      cardKeys.forEach(cardKey => {
        if (cardKey === 'user') {
          cards[cardKey].classList.add('hidden')
        } else {
          cards[cardKey].classList.remove('hidden')
        }
      })
      break
  }
}

function removeCamelCase(key) {
  key = Array.from(key);
  key.forEach((char, index) => {
    if (key[index].charCodeAt(0) <= 90) {
      key[index] = ` ${char.toLowerCase()}`;
    }
  })
  words = key.join('').split(' ');
  const newPhrase = [];
  words.forEach(word => {
    newPhrase.push(word[0].toUpperCase() + word.slice(1));
  })
  return newPhrase.join(' ')
}