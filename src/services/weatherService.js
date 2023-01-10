import _ from "lodash";

const API_KEY = "cfc02e74b97d0e62ce33d1009d7fb1c1";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams, msg) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
        if (res.status === 404) {
          const error = new Error();
          error.message = 'You have to introduce a valid city name';
          throw error;
       } else {
        console.log('oppss..something happened');
       }
    }
  });
};

const formatCurrentWeather = (data) => {
  const {
    cod,
    coord: { lat, lon },
    main: {temp},
    name,
    dt,
    timezone,
    sys: {country},
    weather,
  } = data;

  const { main: details, icon } = weather[0];
  const currentDate = currentDateFormat(timezone, dt, true);
  return {
    cod,
    lat,
    lon,
    temp,
    name,
    currentDate,
    country,
    details,
    icon,
  };
};

const formatNextForecastWeather = (data) => {
    let { city, list } = data;
    let timezone = city.timezone;

    let forecast = _.map(list, (d, index, array) => {
        if((d.dt_txt.split(" ")[1] === '12:00:00') || index === array.length-1){
          const day = currentDateFormat(timezone, d.dt);
            return {
            title: day,
            temp: d.main.temp,
            icon: d.weather[0].icon,
           };                
        }    
       });

    forecast=_.compact(forecast);

    if (forecast.length === 4)
      forecast=_.drop(forecast);

    return {forecast};
};

const getFormattedWeatherData = async (searchParams) => { 
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  )
  .catch(err => 
    {
      if (err) 
       throw err;
    })
  .then(formatCurrentWeather);
  // formattedCurrentWeather = formatCurrentWeather(formattedCurrentWeather);
  
  const { lat, lon } = formattedCurrentWeather;

  const formattedNextForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then(formatNextForecastWeather);

  return { ...formattedCurrentWeather, ...formattedNextForecastWeather };
};

const currentDateFormat = (timezoneIn, dtIn, showFullDate = false) => {
  const dateTime = new Date(dtIn * 1000 + (timezoneIn * 1000));

  // const hour = (dateTime.getHours() === 0)? 22: dateTime.getHours()-2;
  let hour = dateTime.getHours()-2;
  if(hour === -2){
    hour = 22;
  } else if (hour === -1){
    hour = 23;
  }

  let minutes = dateTime.getMinutes();
  if (minutes <= 9)
    minutes = '0' + minutes; 
  const date = dateTime.toDateString();
  const day = date.split(" ")[0];

  return showFullDate? `${date}, ${hour}:${minutes}`:`${day}`;
};

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { iconUrlFromCode };