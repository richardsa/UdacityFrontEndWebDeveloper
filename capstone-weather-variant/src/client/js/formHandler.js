const formButton = document.getElementById('submit');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const feelingsElement = document.getElementById('content');
const searchForm = document.getElementById('search-form');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();


// handle form submit
function formSubmit(event) {
  event.preventDefault();
  const city = document.getElementById('city').value;
  Client.getCity(city)
    // .then(res => res.json())
    .then(function(res) {
      console.log('data' + res);
      const cityBlob = res.geonames[0]
      const city = cityBlob.name;
      const lat = cityBlob.lat;
      const long = cityBlob.lng;
      console.log(city);
      console.log(lat);
      console.log(long);
      Client.getWeather(lat, long)
        .then(function(res) {
          Client.getImage(city)
        })

      postWeather('/add', {
        temp: city,
        feelings: lat,
        date: long
      })
    })
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
searchForm.addEventListener('submit', formSubmit);


export {
  formSubmit
}
