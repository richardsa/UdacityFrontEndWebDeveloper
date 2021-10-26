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

export {
  getWeather
}