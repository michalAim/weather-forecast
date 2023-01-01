import './App.css';
import SearchInput from './components/SearchInput';
import WeatherDetails from './components/WeatherDetails';
import FiveDaysForecast from './components/FiveDaysForecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';

function App() {

  const [query, setQuery] = useState({q: 'Tel aviv'});
  const [weather, setWeather] = useState(null);
  const [units ,setUnits] = useState('metric');
  const [msg, setMsg] = useState('');

  //will fetch the data every time that Query is changing or unit
  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({...query, units}).then(data => {
          setWeather(data);
      });
    };
  
    fetchWeather();
  }, [query, units]);

  return (
    <div className='mx-auto max-w-screen-md mt-4 py-5 px-16 md:px-32 
    bg-gradient-to-br shadow-xl shadow-gray-400 from-yellow-700 to-cyan-700 rounded-xl'>
      <SearchInput setQuery={setQuery} setUnits={setUnits} units={units} />
      
      {weather && (
        <>
          <WeatherDetails weather={weather} units={units}/>
          <FiveDaysForecast items={weather.list}/>
        </>
      )}
    </div>
  );
}

export default App;
