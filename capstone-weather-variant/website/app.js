/* Global Variables */
const baseURL = 'http://api.geonames.org/searchJSON?name=';
const apiKey = '&username=richardsa';

/* documentation https://www.weatherbit.io/api */
const baseWeatherURL = 'https://api.weatherbit.io/v2.0/current?';
const weatherApiKey = '&key=7f4a4e073d7644b3b369e6f93023af3d';

/* pixabay */
const basePixURL = 'https://pixabay.com/api/?image_type=photo&pretty=true'
const pixApiKey = '&key=23952205-479b88a6e03021f13e9186c6c';

const formButton = document.getElementById('generate');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const feelingsElement = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();


// handle form submit
function formSubmit(e) {
  const city = document.getElementById('zip').value;
  getCity(city)
    .then(function() {
      updateUI('all')
    })
}

const getCity = async (city) => {
  let fetchURL = `http://localhost:3000/cities/${city}`;
  fetch(fetchURL)
    .then(res => res.json())
    .then(function(res) {
      const feelings = document.getElementById('feelings').value;
      console.log('data' + res);
      const cityBlob = res.geonames[0]
      const city = cityBlob.name;
      const lat = cityBlob.lat;
      const long = cityBlob.lng;
      console.log(city);
      console.log(lat);
      console.log(long);
      getWeather(baseWeatherURL, lat, long, weatherApiKey)
      postWeather('/add', {
        temp: city,
        feelings: lat,
        date: long
      })
      return res;
    })
}

// send api call to openweathermap
const getWeather = async (baseURL, lat, long, key) => {
  const reqURL = `${baseURL}&lat=${lat}&lon=${long}${weatherApiKey}`
  const res = await fetch(reqURL)
  try {
    const data = await res.json();
    console.log(data);
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
    dateElement.innerHTML = `Date: ${resDate}`;
    tempElement.innerHTML = `Temperature: ${resTemp} &#8457;`;
    feelingsElement.innerHTML = `I'm feeling: ${resFeelings}`;
  } catch (error) {
    console.log("error", error);
  }
}

// bind listener to form button
formButton.addEventListener('click', formSubmit);
