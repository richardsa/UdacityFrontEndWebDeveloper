const getCity = async (city) => {
  let fetchURL = `http://localhost:3000/cities/${city}`;
  const res = await fetch(fetchURL)
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

export {
  getCity
}