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

window.addEventListener('click', (event) => clickFunctions(currentUser, event));
window.addEventListener('load', () => loadFunctions());
window.addEventListener('mouseover', (event) => backgroundColorChange(event));

function clickFunctions(user, event) {
  displayUserInfo(user, event);
  renderCharts(currentDate, event);
}

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
  cardToggle(event);
}

function cardToggle(event) {
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
    case 'activityTracker':
      cardKeys.forEach(cardKey => {
        if (cardKey === 'activity') {
          cards[cardKey].classList.remove('hidden');
          cards[cardKey].classList.add('chart');
        } else {
          cards[cardKey].classList.add('hidden');
        }
      });
      break;
    case 'hydrationStation':
      cardKeys.forEach(cardKey => {
        if (cardKey === 'hydration') {
          cards[cardKey].classList.remove('hidden');
          cards[cardKey].classList.add('chart');
        } else {
          cards[cardKey].classList.add('hidden');
        }
      });
      break;
    case 'sleepHygiene':
      cardKeys.forEach(cardKey => {
        if (cardKey === 'sleep') {
          cards[cardKey].classList.remove('hidden');
          cards[cardKey].classList.add('chart');
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
          cards[cardKey].classList.remove('chart');
          returnCardsToDefault(cardKey);
        }
      });
      break;
  }
}

function returnCardsToDefault(card) {
  switch (true) {
    case card === 'hydration':
      cards[card].innerHTML = `<h3 class="hydration-station">Hydration Station</h3><p><strong>${dailyOunces} oz.</strong> of water consumed today</p><button class="hydration-station">More...</button>`
      break;
    case card === 'activity':
      cards[card].innerHTML = `<h3 class="activity-tracker">Activity Tracker</h3><p>You have taken <strong>${dailySteps} steps</strong> today <p>[equivalent to ${dailyMiles} miles]</p></p><button class="activity-tracker">More...</button>` 
      break;
    case card === 'sleep':
      cards[card].innerHTML = `<h3 class="sleep-hygiene">Sleep Hygiene</h3><p>You slept <strong>${dailySleepHours} hours</strong> today</p><button class="sleep-hygiene">More...</button>`
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
  displayBasicStats();
};

function displayBasicStats() {
  userSleepData = new Sleep(currentUser.id, sleepData);
  userHydrationData = new Hydration(currentUser.id, hydrationData);
  userActivityData = new Activity(currentUser.id, activityData, userData);
  dailyOunces = userHydrationData.calculateDailyOunces(currentDate);
  dailySleepHours = userSleepData.findDailyHours(currentDate);
  dailySteps = userActivityData.findDailySteps(currentDate);
  dailyMiles = userActivityData.calculateDailyMiles(currentDate);
  
  cards.hydration.innerHTML += `<p><strong>${dailyOunces} oz.</strong> of water consumed today</p><button class="hydration-station">More...</button>`
  cards.sleep.innerHTML += `<p>You slept <strong>${dailySleepHours} hours</strong> today</p><button class="sleep-hygiene">More...</button>`
  cards.activity.innerHTML += `<p>You have taken <strong>${dailySteps} steps</strong> today <p>[equivalent to ${dailyMiles} miles]</p></p><button class="activity-tracker">More...</button>`   
}

function displayWelcome() {
  currentUser = generateRandomUser();

  userGreeting.innerHTML += `
  <h1>Let's Get FitLit, ${currentUser.sayName()}!</h1>
  <h3>${userRepo.allUsersAverageSteps()} is the average step goal for all FitLit users</h3>`;
}


function renderCharts(date, event) {
  Chart.defaults.global.defaultFontColor = 'white';
  switch (event.target.id) {
    case 'hydrationStation':
      renderHydrationChart(date);
      break;
    case 'activityTracker':
      renderActivityChart(date);
      break;
    case 'sleepHygiene':
      renderSleepChart(date);
      break;
  }
}

function renderActivityChart(date) {
  cards.activity.innerHTML = `<div id="closeButton">❌</div><canvas class="sleep-hygiene" id="activityChart"Chart"></canvas><canvas class="sleep-hygiene" id="activityChart2"></canvas>`
  const userActivityData = new Activity(currentUser.id, activityData, userData);
  // const dailyMiles = userActivityData.calculateDailyMiles((date));
  const dailyMinutesActive = userActivityData.calculateDailyMinutes(date);
  const dailySteps = userActivityData.findDailySteps(date);
  const dailyStairs = userActivityData.findDailyStairs(date);
  const allUsersStairs = userActivityData.findAllUsersStairsAverage(date);
  const allUsersSteps = userActivityData.findAllUsersStepsAverage(date);
  const allUsersMinutes = userActivityData.finAllUsersMinutesAverage(date);

  cards.activity.innerHTML = `<div class="navigation" id="closeButton">❌</div><p class="activity-tracker">Today you've been active for <strong>${dailyMinutesActive} minutes</strong> and taken taken <strong>${dailySteps} steps</strong> [equivalent to <strong>${dailyMiles} miles</strong>]<canvas class="activity-tracker" id="activityChart"><p>This past week's stats:</p>`
  
  const activityElement = document.getElementById('activityChart').getContext('2d');
  const activityElement2 = document.getElementById('activityChart2').getContext('2d');
  const myActivityChart = new Chart(activityElement, {
    type: 'bar',
    data: {
      labels: ['Flights of Stairs', 'Active Minutes'],
      datasets: [{
        label: 'User\'s data',
        backgroundColor: ['#35d0ba','#35d0ba'],
        data: [dailyStairs, dailyMinutesActive],
        borderColor: 'white',
        borderWidth: 2,
      }, {
        label: 'Average of FitLit users',
        backgroundColor: ['#ffcd3c','#ffcd3c','#ffcd3c'],
        data: [allUsersStairs,allUsersMinutes],
        borderColor: 'white',
        borderWidth: 2,
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Latest Day Comparison',
      },
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false,
            maxRotation: 0,
          }
        }],
        yAxes: [{
          ticks:  {
            beginAtZero: true
          },
        }]
      },
      
      animation: {
      onComplete: function() {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;
          ctx.textAlign = 'center';
          ctx.fillStyle = "rgb(255,255,255)";
          ctx.textBaseline = 'bottom';
          this.data.datasets.forEach((dataset, i) => {
            var meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach((bar, index) => {
              var data = dataset.data[index];
              ctx.fillText(data, bar._model.x, bar._model.y - 5);
            });
          });
        }
      }
    }
  });
  const myActivityChart2 = new Chart(activityElement2, {
    type: 'bar',
    data: {
      labels: ['Steps', 'Steps'],
      datasets: [{
        backgroundColor: ['#35d0ba', '#ffcd3c'],
        data: [dailySteps, allUsersSteps],
        borderColor: 'white',
        borderWidth: 2,
      }]
    },
    options: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false,
            maxRotation: 0,
          }
        }],
        yAxes: [{
          ticks:  {
            beginAtZero: true
          },
        }]
      },
      animation: {
      onComplete: function() {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;
          ctx.textAlign = 'center';
          ctx.fillStyle = "rgb(255,255,255)";
          ctx.textBaseline = 'bottom';
          this.data.datasets.forEach((dataset, i) => {
            var meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach((bar, index) => {
              var data = dataset.data[index];
              ctx.fillText(data, bar._model.x, bar._model.y - 5);
            });
          });
        }
      }
    }
  });
}
let dailyOunces;
let dailySleepHours;
let userSleepData;
let userHydrationData;
let dailySteps;
let userActivityData;

function renderHydrationChart(date) {
  let weeklyOunces = userHydrationData.calculateWeeklyOunces(date);
  cards.hydration.innerHTML = `<div class="navigation" id="closeButton">❌</div>
        <p class="hydration-station">You've had <strong>${dailyOunces} oz.</strong> of water today, and <strong>${weeklyOunces} oz.</strong> this week! Chug! Chug! Chug! Like a fish, baby!</p>
        <canvas class="hydration-station" id="hydrationChart"></canvas>`;
  const hydrationElement = document.getElementById('hydrationChart').getContext('2d');
  let hydrationChart = new Chart(hydrationElement, {
    type: 'doughnut',
    data: {
      labels: [`Today`, `This Week`],
      datasets: [{
        label: 'Ounces of Water Consumed',
        data: [`${dailyOunces}`, `${weeklyOunces}`],
        backgroundColor: ['lightSeaGreen', 'royalBlue'],
        borderWidth: 0,
        hoverBorderColor: '#b9fffc',
        hoverBorderWidth: 1,
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Ounces of Water Consumed',
        fontStyle: '',
      },
      legend: {
        display: true,
      },
    },
  });
}

function renderSleepChart(date) {
  cards.sleep.innerHTML = `<div class="navigation" id="closeButton">❌</div><canvas class="sleep-hygiene" id="sleepHoursChart"></canvas><canvas class="sleep-hygiene" id="sleepQualityChart"></canvas>`
  const sleepHoursElement = document.getElementById('sleepHoursChart').getContext('2d');
  const sleepQualityElement = document.getElementById('sleepQualityChart').getContext('2d');
  dailySleepHours = userSleepData.findDailyHours(date);
  const dailySleepQuality = userSleepData.findDailyQuality(date);
  const weeklySleepHours = userSleepData.calculateAverageHoursWeekly(date);
  const weeklySleepQuality = userSleepData.calculateAverageQualityWeekly(date);
  const averageSleepHours = userSleepData.calculateAverageHoursTotal();
  const averageSleepQuality = userSleepData.calculateAverageQualityTotal();

  const sleepHoursChart = new Chart(sleepHoursElement, {
    type: 'bar',
    data: {
      labels: ['Today', 'Weekly Avg.', 'Total Average'],
      datasets: [{
        data: [dailySleepHours, weeklySleepHours, averageSleepHours],
        backgroundColor: ['slateBlue', 'slateBlue', 'coral'],
        borderColor: 'white',
        borderWidth: 2,
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Sleep Hours',
        fontStyle: '',
      },
      legend: {
        display: false,
      },
      layout: {},
      tooltips: {},
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false,
            maxRotation: 0,
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            color: 'lightGrey'
          }
        }]
      }, 
      animation: {
        onComplete: function() {
          var chartInstance = this.chart,
            ctx = chartInstance.ctx;
            ctx.textAlign = 'center';
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.textBaseline = 'bottom';
            this.data.datasets.forEach((dataset, i) => {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach((bar, index) => {
                var data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
            });
          }
        }
    },
  });
  const sleepQualityChart = new Chart(sleepQualityElement, {
    type: 'bar',
    data: {
      labels: ['Today', 'Weekly Avg.', 'Total Average'],
      datasets: [{
        data: [dailySleepQuality, weeklySleepQuality, averageSleepQuality],
        backgroundColor: ['papayaWhip', 'papayaWhip', 'cadetBlue'],
        borderColor: 'white',
        borderWidth: 2,
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Sleep Quality',
        fontStyle: '',
      },
      legend: {
        display: false,
      },
      layout: {},
      tooltips: {},
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false,
            maxRotation: 0,
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            color: 'lightGrey'
          }
        }]
      },
      animation: {
        onComplete: function() {
          var chartInstance = this.chart,
            ctx = chartInstance.ctx;
            ctx.textAlign = 'center';
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.textBaseline = 'bottom';
            this.data.datasets.forEach((dataset, i) => {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach((bar, index) => {
                var data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
            });
          }
        }
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
    case event.target.classList.contains('navigation'):
      body.style.backgroundColor = '#fbe6c2';
      stripe1.style.backgroundColor = '#f0c929'
      stripe2.style.backgroundColor = '#f48b29'
      stripe3.style.backgroundColor = '#ac0d0d'
      navTabs.style.color = 'black'
      userGreeting.style.color = 'black'
      break
  }
}