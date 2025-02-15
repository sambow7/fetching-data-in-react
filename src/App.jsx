// src/App.jsx
import WeatherDetails from './components/WeatherDetails/WeatherDetails';
import WeatherSearch from './components/WeatherSearch/WeatherSearch';
import * as weatherService from './services/weatherService';
import { useState, useEffect } from 'react';


const App = () => {
  const [weather, setWeather] = useState({});
  const [user, setUser] = useState(null);

  const fetchData = async (city) => {
    const data = await weatherService.show(city);
    const newWeatherState = {
      location: data.location.name,
      temperature: data.current.temp_f,
      condition: data.current.condition.text,
    };
    setWeather(newWeatherState);
  };
  console.log('State:', weather);

  useEffect(() => {
    const fetchCityName = async (latitude, longitude) => {
      const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
      const data = await response.json();
      return data.postcode
    };

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const city = await fetchCityName(latitude, longitude);
      const data = await weatherService.show(city);
      const newWeatherState = {
      location: data.location.name,
      temperature: data.current.temp_f,
      condition: data.current.condition.text,
      };
      setWeather(newWeatherState);
    });
  }, []);

  return (
    <main>
      <h1>Weather API</h1>
      <WeatherSearch fetchData={fetchData}/>
      <WeatherDetails weather={weather}/>
    </main>
  );
};

export default App