import React from 'react';
import { iconUrlFromCode } from '../services/weatherService';

function WeatherDetails({weather: {currentDate ,name, country, icon, temp, details}, units}) {
    const unitsDesc = units === 'metric'? '°' : 'F';

  return <div>
        <div className='flex items-center justify-center my-6'>
            <p className='text-white text-xl font-extralight'>
              {currentDate}
            </p>
        </div>

        <div className='flex items-center justify-center my-3'>
            <p className='text-white text-3xl font-medium'>{`${name}, ${country}`}</p>
        </div>
        <div className='flex items-center justify-center my-3'>
            <img src={iconUrlFromCode(icon)} alt='icon-url-for-today' className='w-12' />
            <div className='flex items-center justify-center py-6 text-xl text-grey-300'>
               <p>| {details} |</p>
            </div>
            <p className='text-2xl p-2 text-grey-300'>{`${temp.toFixed()}${unitsDesc}`}</p>
        </div>
    </div>
}

export default WeatherDetails