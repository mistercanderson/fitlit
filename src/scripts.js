// const Hydration = require("./Hydration");

const userRepo = new UserRepository(userData);
let currentUser;
const currentDate = '2019/09/22';
const userGreeting = document.querySelector('.user-greeting');
const userAverageSteps = document.querySelector('.user-average-steps');

// maybe put this into an object of nav bar tabs 👇
const profileTab = document.getElementById('profileTab');

const cards = {
  user: document.getElementById('userCard'),
  activity: document.getElementById('activityTracker'),
  hydration: document.getElementById('hydrationStation'),
  sleep: document.getElementById('sleepHygiene')
};


window.addEventListener('click', (event) => displayUserInfo(currentUser, event));
window.addEventListener('load', () => loadFunctions());

function displayUserInfo(user, event) {
  const userKeys = Object.keys(user);
  userKeys.forEach(key => {
    let currentElement = document.getElementById(key);
    switch (key) {
    case 'address':
      currentElement.innerText = '';
      const address = user[key].split('-')[0];
      currentElement.innerText += `${removeCamelCase(key)}: ${address}`;
      break;
    case 'friends':
      currentElement.innerText = '';
      const friendNumbers = user[key];
      const userList = userRepo.userList;
      const friends = friendNumbers.map(friendNumber =>
        userList[friendNumber - 1].name);
      currentElement.innerText += `${removeCamelCase(key)}: ${friends.join(', ')}`;
      break;
    case 'id':
      break;
    default:
      currentElement.innerText = '';
      currentElement.innerText += `${removeCamelCase(key)}: ${user[key]}`;
    }
  });
  userProfileToggle(event);
}

function userProfileToggle(event) {
  const cardKeys = Object.keys(cards);
  switch (event.target.id) {
  case 'profileTab':
    cardKeys.forEach(cardKey => {
      if (cardKey === 'user') {
        cards[cardKey].classList.remove('hidden');
      } else {
        cards[cardKey].classList.add('hidden');
      }
    });
    break;
  case 'closeButton':
    cardKeys.forEach(cardKey => {
      if (cardKey === 'user') {
        cards[cardKey].classList.add('hidden');
      } else {
        cards[cardKey].classList.remove('hidden');
      }
    });
    break;
  }
}

function removeCamelCase(key) {
  key = Array.from(key);
  key.forEach((char, index) => {
    if (key[index].charCodeAt(0) <= 90) {
      key[index] = ` ${char.toLowerCase()}`;
    }
  });
  words = key.join('').split(' ');
  const newPhrase = [];
  words.forEach(word => {
    newPhrase.push(word[0].toUpperCase() + word.slice(1));
  });
  return newPhrase.join(' ');
}


const getRandomNum = (array) => {
  return Math.floor(Math.random() * array.length);
};

const generateRandomUser = () => {
  let randomUser = userData[getRandomNum(userData)];
  let user = new User(randomUser);
  return user;
};

const loadFunctions = () => {
  displayWelcome();
  renderHydrationChart(currentDate);
};

function displayWelcome() {
  currentUser = generateRandomUser();

  userGreeting.innerHTML += `
  <h1>Let's Get Physical, ${currentUser.sayName()}!</h1>
  <h2>${userRepo.allUsersAverageSteps()} is the average step goal amongst all users.</h2>
  `;
}
// Global chart options

function renderHydrationChart(date) {
  Chart.defaults.global.defaultFontColor = 'white';
  Chart.defaults.global.defaultFontStyle = 'italic';
  Chart.defaults.global.defaultFontSize = 18;
  Chart.defaults.global.animationDuration = .5;
  Chart.defaults.global.animationEasing = 'easeInBounce'
  cards.hydration.innerHTML += `<canvas id="hydrationChart"></canvas>`
  const hydrationElement = document.getElementById('hydrationChart').getContext('2d')
  const userHydrationData = new Hydration(currentUser.id, hydrationData);
  let dailyOunces = userHydrationData.calculateDailyOunces(date);
  let weeklyOunces = userHydrationData.calculateWeeklyOunces(date);
  let hydrationChart = new Chart(hydrationElement, {
    type: 'doughnut',
    data: {
      labels: ['Today', 'This Week'],
      datasets: [{
        label: 'Ounces of Water Consumed',
        data: [`${dailyOunces}`, `${weeklyOunces}`],
        backgroundColor: ['#9ab3f5', '#a3d8f4'],
        borderWidth: 0,
        // borderColor: 'black',
        // hoverBorderWidth: 3,
        hoverBorderColor: '#b9fffc',
        hoverBorderWidth: 1
      }] 
    },
    options: {
      title: {
        display: true,
        text: 'Ounces of Water Consumed',
        fontStyle: '',
      },
      legend: {
        position: 'right',
      },
      layout: {},
      tooltips: {},
    }, 
  })
}
