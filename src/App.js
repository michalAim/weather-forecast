import './App.css';
import SearchInput from './components/SearchInput';
import CitySearchInput from './components/CitySearchInput';
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
      await getFormattedWeatherData({...query, units})
      // .catch(err => console.log('errorApp:', err))
      .catch(err => {
        setMsg(err);
      })
      .then(data => {
          setWeather(data);
      });
    };
  
    setMsg('');
    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return 'from-cyan-700 to-blue-700';

    const threshold = units === 'metric' ? 20 : 60;
    if (weather.temp <= threshold) return 'from-cyan-700 to-blue-700'

    return 'from-yellow-700 to-orange-700'
  };

  return (
    <>
      <div className={`mx-auto max-w-screen-md mt-4 py-5 px-16 md:px-32 
      bg-gradient-to-br shadow-xl shadow-gray-400 rounded-xl ${formatBackground()}`}>
        {/* <SearchInput setQuery={setQuery} setUnits={setUnits} units={units} /> */}
        <CitySearchInput setQuery={setQuery} setUnits={setUnits} units={units} />
        {msg !== '' && <div className='flex justify-center text-white text-sm md:text-md '>You have to introduce a valid city name</div>}

        {weather && (
          <>
            <WeatherDetails weather={weather} units={units}/>
            <FiveDaysForecast items={weather.forecast}/>
          </>
        )}
      </div>
    </>
  );
}

export default App;
