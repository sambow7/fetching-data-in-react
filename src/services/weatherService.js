// src/services/weatherService.js

const API_KEY = '09ad5161b6a646d7a9721946251402';
const BASE_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}`;


const show = async (city) => {
  try {
    const queryString = `&q=${city}`;
    const res = await fetch(BASE_URL + queryString);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { show };