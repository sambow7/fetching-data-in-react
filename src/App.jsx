// src/App.jsx
import WeatherDetails from './components/WeatherDetails/WeatherDetails';
import WeatherSearch from './components/WeatherSearch/WeatherSearch';
import * as weatherService from './services/weatherService';
import { useState, useEffect } from 'react';


const App = () => {
  const [weather, setWeather] = useState({});
  const fetchData = async (city) => {
    const data = await weatherService.show(city);
    const newWeatherState = {
      location: data.location.name,
      temperature: data.current.temp_f,
      condition: data.current.condition.text,
    };
    setWeather(newWeatherState);
  };
  // The following log should be outside of the fetchData function
  console.log('State:', weather);

  useEffect(() => {

    // Define a fetch function:
    const fetchDefaultData = async () => {
      const data = await weatherService.show('London');
      const newWeatherState = {
        location: data.location.name,
        temperature: data.current.temp_f,
        condition: data.current.condition.text,
      };
      setWeather(newWeatherState);
    };

    // Call the fetch function when the page loads:
    fetchDefaultData();


  }, []); // An empty dependency array means this runs once after the initial render

  return (
    <main>
      <h1>Weather API</h1>
      <WeatherSearch fetchData={fetchData} />
      <WeatherDetails weather={weather} />
    </main>
  );
};

export default App;