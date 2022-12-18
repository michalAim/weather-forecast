import { DateTime } from "luxon";

const API_KEY = "cfc02e74b97d0e62ce33d1009d7fb1c1";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => {
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
    sys: {country},
    weather,
  } = data;

  const { main: details, icon } = weather[0];

  return {
    cod,
    lat,
    lon,
    temp,
    name,
    dt,
    country,
    details,
    icon,
  };
};

const formatNextForecastWeather = (data) => {
    let { timezone, list } = data;
    list = list.slice(0, 39).map((d, index, array) => {
        if((formatToLocalTime(d.dt, timezone, "ccc")) !== formatToLocalTime(array[0].dt, timezone, "ccc")){
            if((d.dt_txt.split(" ")[1] === '12:00:00') || index === array.length-1){
                return {
                title: formatToLocalTime(d.dt, timezone, "ccc"),
                temp: d.main.temp,
                icon: d.weather[0].icon,
               };                
            }
        }
    });

    list = list.filter(item => item !== undefined);

    if (list.length === 4)
      list.pop();

    return { timezone, list };
};

const getFormattedWeatherData = async (searchParams) => { 
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedNextForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then(formatNextForecastWeather);

  return { ...formattedCurrentWeather, ...formattedNextForecastWeather };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy'"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };