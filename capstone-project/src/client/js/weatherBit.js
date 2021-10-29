// send api call to openweathermap
const getWeather = async (lat, long, timeFrame, tripDate) => {
  let fetchURL;
  if (timeFrame == 'Predicted' ){
    let startDate = new Date(tripDate);
    let endDate = new Date(tripDate);
    console.log('end date' + endDate);
    endDate = endDate.setUTCDate(endDate.getUTCDate() + 1);
    console.log('end date' + endDate);
    console.log('start date ' + startDate);
    startDate = formatDate(startDate);
    endDate = formatDate(endDate);

    fetchURL = `http://localhost:3000/avg-weather/?lat=${lat}&lon=${long}&start_day=${startDate}&end_day=${endDate}`
  } else {
    fetchURL = `http://localhost:3000/weather/?lat=${lat}&lon=${long}`
  }
  const res = await fetch(fetchURL)
  try {
    const data = await res.json();
    console.log(data.data[0])
    return data.data[0];
  } catch (error) {
    console.log("error", error);
  }
}

function formatDate(date) {
  console.log('date formatted' + date);
  date = new Date(date)
  date = date.toISOString().split('T')[0];
  date = date.slice(5)
  return date;
}

export {
  getWeather
}