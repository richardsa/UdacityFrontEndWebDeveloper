/* Global Variables */
const baseURL = 'http://api.geonames.org/searchJSON?name=';
const apiKey = '&username=richardsa';
const formButton = document.getElementById('generate');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const feelingsElement = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();


// handle form submit
function formSubmit(e) {
  const zipCode = document.getElementById('zip').value;
  getWeather(baseURL, zipCode, apiKey)
    .then(function(data) {
      const feelings = document.getElementById('feelings').value;
      const cityBlob = data.geonames[0]
      const city = cityBlob.name;
      const lat = cityBlob.lat;
      const long = cityBlob.lng;
      console.log(city);
      console.log(lat);
      console.log(long);
      postWeather('/add', {
        temp: city,
        feelings: lat,
        date: long
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
    dateElement.innerHTML = `Date: ${resDate}`;
    tempElement.innerHTML = `Temperature: ${resTemp} &#8457;`;
    feelingsElement.innerHTML = `I'm feeling: ${resFeelings}`;
  } catch (error) {
    console.log("error", error);
  }
}

// bind listener to form button
formButton.addEventListener('click', formSubmit);
