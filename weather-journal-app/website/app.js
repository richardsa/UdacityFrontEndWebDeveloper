/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&zip=';
const apiKey = '&appid=ADDAPIKEYHERE';
const formButton = document.getElementById('generate');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const feelingsElement = document.getElementById('content');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


// handle form submit
function formSubmit(e) {
  const zipCode = document.getElementById('zip').value;
  getWeather(baseURL, zipCode, apiKey)
    .then(function(data) {
      const feelings = document.getElementById('feelings').value;
      const temp = data.main.temp;
      postWeather('/add', {
        temp: temp,
        feelings: feelings,
        date: newDate
      })
    })
    .then(function() {
      updateUI('all')
    })
}

// send api call to openweathermap
const getWeather = async (baseURL, zipCode, key) => {
  const res = await fetch(baseURL + zipCode + key)
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

// send post request to app api
const postWeather = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("Something went wrong!", error);
  }

}

const updateUI = async (url) => {
  const res = await fetch(url)
  try {
    const data = await res.json();
    const resDate = data.weatherData.date;
    const resTemp = data.weatherData.temp;
    const resFeelings = data.weatherData.feelings;
    dateElement.innerText = `Date: ${resDate}`;
    tempElement.innerText = `Temperature: ${resTemp} &#8457;`;
    feelingsElement.innerText = `I'm feeling: ${resFeelings}`;
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

// bind listener to form button
formButton.addEventListener('click', formSubmit);
