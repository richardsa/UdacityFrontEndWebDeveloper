/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&zip='
const apiKey = '&appid=1b88888895a6d6f52a820b56b2332ca5';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  const zipCode = document.getElementById('zip').value;
  getWeather(baseURL, zipCode, apiKey)
}


const getWeather = async (baseURL, zipCode, key)=>{

  const res = await fetch(baseURL+zipCode+key)
  try {

    const data = await res.json();
    console.log(data)
    document.getElementById('date').innerText = newDate;
    document.getElementById('temp').innerText  = JSON.stringify(data.main.temp);
    document.getElementById('content').innerText  = document.getElementById('feelings').value;
  }  catch(error) {
    // appropriately handle the error
    console.log("error", error);
  }
}
