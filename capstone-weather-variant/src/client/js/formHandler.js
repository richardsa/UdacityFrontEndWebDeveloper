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
    // .then(res => res.json())
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
      getWeather(lat, long)
        .then(function(res) {
          getImage(city)
        })

      postWeather('/add', {
        temp: city,
        feelings: lat,
        date: long
      })
    })
}

const getImage = async (city) => {
  let fetchURL = `http://localhost:3000/images/${city}`;
  const res = await fetch(fetchURL)
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }

}

const getCity = async (city) => {
  let fetchURL = `http://localhost:3000/cities/${city}`;
  const res = await fetch(fetchURL)
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
  // fetch(fetchURL)
  //   .then(res => res.json())
  //   .then(function(res) {
  //     console.log('res' + res)
  //     return res;
  //   })
}

// send api call to openweathermap
const getWeather = async (lat, long) => {
  const fetchURL = `http://localhost:3000/weather/?lat=${lat}&lon=${long}`
  const res = await fetch(fetchURL)
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


export {
  formSubmit
}
