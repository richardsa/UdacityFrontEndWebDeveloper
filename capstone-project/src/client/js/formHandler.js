const headingElement = document.getElementById('heading');
const tempElement = document.getElementById('temp');
const searchForm = document.getElementById('search-form');
const resultsImage = document.getElementById('location-img');
const weatherElement = document.getElementById('weather');
const errorMessage = document.getElementById('error-message');
let weekFromToday = new Date();
weekFromToday = weekFromToday.setDate(weekFromToday.getDate() + 7);
let timeFrame = '';



// handle form submit
function formSubmit(event) {
  event.preventDefault();
  // hide error message if present
  errorMessage.style.display = 'none';
  const city = document.getElementById('city').value;
  let tripDate = document.getElementById('trip-date').value;
  let formattedTripDate = new Date(tripDate)
  if (formattedTripDate >= weekFromToday) {
    timeFrame = 'Predicted'
  } else {
    timeFrame = 'Current'
  }
  Client.getCity(city)
    .then(function(res) {
      /* grab necessary elements from geonames response */
      const resultsCount = res.totalResultsCount;
      if (resultsCount == 0) {
        errorMessage.style.display = 'block';
        return;
      }
      const cityBlob = res.geonames[0]
      const city = cityBlob.name;
      const state = cityBlob.adminCode1;
      const country = cityBlob.countryCode;
      const lat = cityBlob.lat;
      const long = cityBlob.lng;
      Client.getWeather(lat, long, timeFrame, tripDate)
        .then(function(weatherRes) {
          /* grab necessary elements from weather bit response */
          const temp = weatherRes.temp;
          const weatherDes = weatherRes.weather.description;
          const weatherIcon = weatherRes.weather.icon;
          Client.getImage(city)
            .then(function(imageRes) {
              // puppy placeholder in case no image is returned
              let img = 'https://placedog.net/500';
              if (imageRes.webformatURL) {
                img = imageRes.webformatURL;
              }
              postData('/add', {
                  city: city,
                  state: state,
                  country: country,
                  image: img,
                  temp: temp,
                  description: weatherDes,
                  icon: weatherIcon,
                  timeFrame: timeFrame
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
    /* grab response from project api to populate UI */
    const resCity = data.data.city;
    const resState = data.data.state;
    const resCountry = data.data.country;
    const resImg = data.data.image;
    const resDescription = data.data.description;
    const resTemp = data.data.temp;
    const resIcon = data.data.icon;
    const resTimeFrame = data.data.timeFrame;
    headingElement.innerHTML = `${resTimeFrame} Weather for ${resCity}, ${resState}, ${resCountry}`;
    tempElement.innerHTML = `Temperature: ${resTemp} &#8457;`;
    resultsImage.innerHTML = `<img src="${resImg}" class="results-img" />`
    weatherElement.innerHTML = resDescription
    Client.setTrip();
  } catch (error) {
    console.log("error", error);
  }
}

searchForm.addEventListener('submit', formSubmit);

export {
  formSubmit
}