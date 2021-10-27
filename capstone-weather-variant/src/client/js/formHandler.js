const formButton = document.getElementById('submit');
const dateElement = document.getElementById('location');
const tempElement = document.getElementById('temp');
const feelingsElement = document.getElementById('content');
const searchForm = document.getElementById('search-form');
const resultsImage = document.getElementById('location-img');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();


// handle form submit
function formSubmit(event) {
  event.preventDefault();
  const city = document.getElementById('city').value;
  Client.getCity(city)
    // .then(res => res.json())
    .then(function(res) {
      console.log('data12' + JSON.stringify(res));
      const cityBlob = res.geonames[0]
      const city = cityBlob.name;
      const state = cityBlob.adminCode1;
      const country = cityBlob.countryCode;
      const lat = cityBlob.lat;
      const long = cityBlob.lng;
      console.log(city);
      console.log(lat);
      console.log(long);
      Client.getWeather(lat, long)
        .then(function(weatherRes) {
          console.log(`res1: ${JSON.stringify(weatherRes.city_name)}`)
          console.log(`res1: ${JSON.stringify(weatherRes.country_code)}`)
          console.log(`res1: ${JSON.stringify(weatherRes.temp)}`)
          console.log(`res1: ${JSON.stringify(weatherRes.weather.description)}`)
          console.log(`count: ${JSON.stringify(weatherRes.count)}`)
          console.log(`res2: ${res}`)
          Client.getImage(city)
            .then(function(imageRes) {
              console.log('imageRes' + imageRes.largeImageURL)
              const img = imageRes.largeImageURL;
              postData('/add', {
                city: city,
                state: state,
                country: country,
                image: img
              })
              .then(function() {
                updateUI('all')
              })
            })
        })
    })
}

// send post request to app api
const postData = async (url, data) => {
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
    const resDate = data.data.city;
    const resTemp = data.data.state;
    const resFeelings = data.data.country;
    const resImg = data.data.image;
    console.log('update ui' + resImg);
    dateElement.innerHTML = `Date: ${resDate}`;
    // tempElement.innerHTML = `Temperature: ${resTemp} &#8457;`;
    resultsImage.innerHTML = `<img src="${resImg}" class="results-img" />`
  } catch (error) {
    console.log("error", error);
  }
}

// bind listener to form button
searchForm.addEventListener('submit', formSubmit);


export {
  formSubmit
}