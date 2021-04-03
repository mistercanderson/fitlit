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
window.addEventListener('mouseover', (event) => backgroundColorChange(event));


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
  renderActivityChart(currentDate);
};

function displayWelcome() {
  currentUser = generateRandomUser();

  userGreeting.innerHTML += `
  <h1>Let's Get FitLit, ${currentUser.sayName()}!</h1>
  <h3>${userRepo.allUsersAverageSteps()} is the average step goal for all FitLit users</h3>`;
}



///////////////// PLAY ///////////////////////
function renderActivityChart(date) {
  Chart.defaults.global.defaultFontColor = 'white';
  Chart.defaults.global.defaultFontStyle = 'italic';
  Chart.defaults.global.defaultFontSize = 18;
  Chart.defaults.global.animationDuration = .5;
  Chart.defaults.global.animationEasing = 'easeInBounce';

  const activityElement = document.getElementById('activityChart').getContext('2d');
  const userActivityData = new Activity (currentUser.id, activityData, userData);
  let dailyMiles = userActivityData.calculateDailyMiles((date));
  let dailyMinutesActive = userActivityData.calculateDailyMinutes(date);
  let dailySteps = userActivityData.userInformation.numSteps;
  

  let myBarChart = new Chart(activityElement, {
    type: 'bar',
    data: {
      labels:['Miles', 'Active Minutes', 'Steps'],
      datasets: [{
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
        data: [`${dailyMiles}`, `${dailyMinutesActive}`, `${dailySteps}` ],
      }]

      // labels: [`Miles`, `Active`],
      // datasets: [{
      //   label: 'Activities today',
      //   // Use data from Hydration instance to apply to chart, must be integer values
      //   data: [`${dailyMiles}`, `${dailyMinutesActive}`],
      //   backgroundColor: ['#9ab3f5', '#a3d8f4'],
      //   borderWidth: 0,
      //   hoverBorderColor: '#b9fffc',
      //   hoverBorderWidth: 1
      // }]

    },
    options: {
      title: {
        display: true,
        text: 'Activities today',
        fontStyle: '',
      },
      legend: {
        position: 'start',
      },
      layout: {},
      tooltips: {},
    },
  });
}









function renderHydrationChart(date) {
  // Could eventually rename this function renderChartData & put separate helper functions within
  // Global chart options
  Chart.defaults.global.defaultFontColor = 'white';
  Chart.defaults.global.defaultFontStyle = 'italic';
  Chart.defaults.global.defaultFontSize = 18;
  Chart.defaults.global.animationDuration = .5;
  Chart.defaults.global.animationEasing = 'easeInBounce';
  // Sets up chart html element CHANGED THIS TO HARDCODE INSIDE HTML
  // cards.hydration.innerHTML += `<canvas class="hydration-station chart" id="hydrationChart"></canvas>`;
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
      labels: [`Today`, `This Week`],
      datasets: [{
        label: 'Ounces of Water Consumed',
        // Use data from Hydration instance to apply to chart, must be integer values
        data: [`${dailyOunces}`, `${weeklyOunces}`],
        backgroundColor: ['#9ab3f5', '#a3d8f4'],
        borderWidth: 0,
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
  const navTabs = document.querySelector('ul')
  const userGreeting = document.querySelector('.user-greeting')
  switch (true) {
    case event.target.classList.contains('activity-tracker'):
      body.style.backgroundColor = '#d92027';
      stripe1.style.backgroundColor = '#35d0ba'
      stripe2.style.backgroundColor = '#ffcd3c'
      stripe3.style.backgroundColor = '#ff9234'
      navTabs.style.color = 'white'
      userGreeting.style.color = 'white'
      break;
    case event.target.classList.contains('hydration-station'):
      body.style.backgroundColor = '#7579e7';
      stripe1.style.backgroundColor = '#a3d8f4'
      stripe2.style.backgroundColor = '#b9fffc'
      stripe3.style.backgroundColor = '#9ab3f5'
      navTabs.style.color = 'white'
      userGreeting.style.color = 'white'
      break;
    case event.target.classList.contains('sleep-hygiene'):
      body.style.backgroundColor = '#151515';
      stripe1.style.backgroundColor = '#301b3f'
      stripe2.style.backgroundColor = '#3c415c'
      stripe3.style.backgroundColor = '#908484'
      navTabs.style.color = 'white'
      userGreeting.style.color = 'white'
      break;
    default:
      body.style.backgroundColor = '#fbe6c2';
      stripe1.style.backgroundColor = '#f0c929'
      stripe2.style.backgroundColor = '#f48b29'
      stripe3.style.backgroundColor = '#ac0d0d'
      navTabs.style.color = 'black'
      userGreeting.style.color = 'black'
  }
}
