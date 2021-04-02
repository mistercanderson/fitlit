const userRepo = new UserRepository(userData);
let currentUser;
const currentDate = '2019/09/22';
const userGreeting = document.querySelector('.user-greeting');
const userAverageSteps = document.querySelector('.user-average-steps');

const navTabs = {
  profile: document.getElementById('profileTab'),
  friends: document.getElementById('friendsTab'),
  ranking: document.getElementById('rankingTab'),
  goals: document.getElementById('goalsTab')
};

const cards = {
  user: document.getElementById('userCard'),
  activity: document.getElementById('activityTracker'),
  hydration: document.getElementById('hydrationStation'),
  sleep: document.getElementById('sleepHygiene')
};

window.addEventListener('click', (event) => displayUserInfo(currentUser, event));
window.addEventListener('load', () => loadFunctions());
window.addEventListener('mouseover', (event) => backgroundColorChange(event))

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
  const words = key.join('').split(' ');
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

function renderHydrationChart(date) {
  // Could eventually rename this function renderChartData & put separate helper functions within
  // Global chart options
  Chart.defaults.global.defaultFontColor = 'white';
  Chart.defaults.global.defaultFontStyle = 'italic';
  Chart.defaults.global.defaultFontSize = 18;
  Chart.defaults.global.animationDuration = .5;
  Chart.defaults.global.animationEasing = 'easeInBounce';
  // Sets up chart html element
  cards.hydration.innerHTML += `<canvas id="hydrationChart"></canvas>`;
  // Stores chart element & context to be passed into Chart instance
  const hydrationElement = document.getElementById('hydrationChart').getContext('2d');
  // Creates instance of Hydration class using currentUser & data
  const userHydrationData = new Hydration(currentUser.id, hydrationData);
  let dailyOunces = userHydrationData.calculateDailyOunces(date);
  let weeklyOunces = userHydrationData.calculateWeeklyOunces(date);
  // Creates instance of Chart using html element
  let hydrationChart = new Chart(hydrationElement, {
    // Object containing various chart configuration settings
    type: 'doughnut',
    data: {
      labels: ['Today', 'This Week'],
      datasets: [{
        label: 'Ounces of Water Consumed',
        // Use data from Hydration instance to apply to chart, must be integer values
        data: [`${dailyOunces}`, `${weeklyOunces}`],
        backgroundColor: ['#9ab3f5', '#a3d8f4'],
        borderWidth: 0,
        // borderColor: 'black',
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
  });
}

function backgroundColorChange(event) {
    const body = document.querySelector('body')
    const stripe1 = document.querySelector('.stripe-one');
    const stripe2 = document.querySelector('.stripe-two');
    const stripe3 = document.querySelector('.stripe-three');
  switch (event.target.id) {
    case 'activityTracker':
      body.style.backgroundColor = '#d92027';
      stripe1.style.backgroundColor = '#ff9234'
      stripe2.style.backgroundColor = '#ffcd3c'
      stripe3.style.backgroundColor = '#35d0ba'
      break;
    case 'hydrationStation':
      body.style.backgroundColor = '#7579e7';
      stripe1.style.backgroundColor = '#9ab3f5'
      stripe2.style.backgroundColor = '#a3d8f4'
      stripe3.style.backgroundColor = '#b9fffc'
      break;
    case 'sleepHygiene':
      body.style.backgroundColor = '#151515';
      stripe1.style.backgroundColor = '#301b3f'
      stripe2.style.backgroundColor = '#3c415c'
      stripe3.style.backgroundColor = '#b4a5a5'
      break;
    default:
      body.style.backgroundColor = '#fbe6c2';
      stripe1.style.backgroundColor = '#f0c929'
      stripe2.style.backgroundColor = '#f48b29'
      stripe3.style.backgroundColor = '#ac0d0d'
  }
}
// color stripes
// main: #fbe6c2, #f0c929, #f48b29, #ac0d0d
// activity: #d92027 #ff9234 #ffcd3c #35d0ba
// water: #7579e7 #9ab3f5 #a3d8f4 #b9fffc
// sleep: #151515 #301b3f #3c415c #b4a5a5