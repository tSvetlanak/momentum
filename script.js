// DOM Elements
const time = document.querySelector('.time'),
    dateDay = document.querySelector('.date'),
    dateYear = document.querySelector('.year'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focusDiv = document.querySelector('.focus-div');
const btn = document.querySelector('.btn');
let base = 'assets/images/morning/';
let baseSrc = ['assets/images/night/', 'assets/images/morning/', 'assets/images/day/',
    'assets/images/evening/'
]
let i = 0;
let j = 0;
let baseIndex = 0;
let dayBaseImages = [];

// Show Time
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds(),
        year = today.getFullYear(),
        month = today.getMonth(),
        day = today.getDate(),
        dayOfWeek = today.getDay();
    const allDayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];
    const allMonth = ["January", "Febriary", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    if (min === 0 && sec === 0) { setBgGreet(hour); }

    // Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    dateDay.innerHTML = `${allDayOfWeek[dayOfWeek]}<span>,&#160</span>${day}
    <span>&#160</span>${allMonth[month]}`;
    dateYear.innerHTML = `${year}<span>&#160year</span>`;
    setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
let td = new Date(),
    h = td.getHours();

// Set Background and Greeting
function setBgGreet(hour) {
    let hh = (hour + j) % 24;
    viewBgImage(dayBaseImages[hh - 1]);
    getQuote();
    if (hour < 6) {
        greeting.textContent = 'Good Evening, ';
    } else if (hour < 12) {
        greeting.textContent = 'Good Morning, ';
    } else if (hour < 18) {
        greeting.textContent = 'Good Day, ';
    } else if (hour < 24) {
        greeting.textContent = 'Good Afternoon, ';
    }
}

// Get Name
let nameText = name.textContent;

function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Your name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
    nameText = name.textContent;
}

// Set Name
function setName(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if ((e.which === 13 || e.keyCode === 13) && e.target.textContent.trim() !== '') {
            localStorage.setItem('name', e.target.textContent);
            nameText = e.target.textContent.trim();
            name.blur();
        } else {

        }
    }
}
name.onfocus = () => name.textContent = '';
name.onblur = () => {
    if (name.textContent.trim() === '') name.textContent = nameText.trim();
};

// Get Focus
let focusText = focusDiv.textContent;

function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focusDiv.textContent = '[Enter Focus]';
    } else {
        focusDiv.textContent = localStorage.getItem('focus');
    }
    focusText = focusDiv.textContent;
}
// Set Focus
function setFocus(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focusDiv.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}
focusDiv.onfocus = () => focusDiv.innerText = '';
focusDiv.onblur = () => {
    if (focusDiv.innerText.trim() === '') { focusDiv.innerText = focusText; }
};

function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
    };
}


function getImage() {
    let td = new Date(),
        h = td.getHours();
    const index = (h + i) % dayBaseImages.length;
    viewBgImage(dayBaseImages[index]);
    i++;
    j = index - h;
    setTimeout(function() { btn.disabled = false; }, 1000);
}

function getBaseImages() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 6; j++) {
            let num = getRandomIntInclusive(1, 20);
            let bgSrc = num < 10 ? '0' + String(num) : String(num);
            bgSrc = baseSrc[i] + bgSrc + '.jpg';
            dayBaseImages.push(bgSrc);
        }
    }
}

//===============================================
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btnq = document.querySelector('.btnq');

async function getQuote() {
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;
    const res = await fetch(url);
    const data = await res.json();
    blockquote.textContent = data.quoteText;
    figcaption.textContent = data.quoteAuthor;
}

//================================================
btnq.addEventListener('click', getQuote);

/* =====================================weather========= */
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
let cityText = city.textContent.trim();
async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=fbe738f9c849d632a2f9c29207d1b7e2&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod != 200) {
        city.textContent = "[your location error]";
        weatherIcon.className = "weather-icon owf";
        temperature.textContent = ``;
        weatherDescription.textContent = "";
        humidity.textContent = ``;
        windSpeed.textContent = ``;
    } else {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
        humidity.textContent = `Влажность: ${data.main.humidity}%`;
        windSpeed.textContent = `Скорость ветра: ${data.wind.speed}m/s`;
        weatherDescription.textContent = data.weather[0].description;
    }
}




function getCity() {
    if (localStorage.getItem('city') === null) {
        city.textContent = '[Enter your location]';
    } else {
        city.textContent = localStorage.getItem('city');
    }
    cityText = city.textContent;
}

function setCity(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if ((e.which === 13 || e.keyCode === 13) && e.target.textContent.trim() !== '') {
            localStorage.setItem('city', e.target.textContent);
            cityText = e.target.textContent.trim();
            city.blur();
            getWeather();

        }
    }
}

city.onfocus = () => city.textContent = '';
city.onblur = () => {
    if (city.textContent.trim() === '') { city.textContent = cityText; }
};
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
btn.addEventListener('click', getImage);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focusDiv.addEventListener('keypress', setFocus);
focusDiv.addEventListener('blur', setFocus);

// Run
showTime();
getBaseImages();
setBgGreet(h);
getName();
getFocus();
getCity();