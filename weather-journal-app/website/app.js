/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&zip=';
const apiKey = '&appid=YOURAPIKEY';
const formButton = document.getElementById('generate');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// handle form submit
function formSubmit(e){
  const zipCode = document.getElementById('zip').value;
  getWeather(baseURL, zipCode, apiKey)
    .then(function(data){
      const feelings = document.getElementById('feelings').value;
      const temp = data.main.temp;
      postWeather('/add', {
        temp: temp,
        feelings: feelings,
        date: newDate
      });
    })
}

// send api call to openweathermap
const getWeather = async (baseURL, zipCode, key)=>{
  const res = await fetch(baseURL+zipCode+key)
  try {
    const data = await res.json();
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}

const postWeather = async (url, data) => {
  console.log(data);
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

// bind listener to form button
formButton.addEventListener('click', formSubmit);
