import React from 'react';
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherService';

function WeatherDetails({weather: {dt, timezone, name, country, icon, temp, details}}) {
  return <div>
        <div className='flex items-center justify-center my-6'>
            <p className='text-white text-xl font-extralight'>
              {formatToLocalTime(dt, timezone)}
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
            <p className='text-2xl p-2 text-grey-300'>{`${temp.toFixed()}°`}</p>
        </div>
    </div>
}

export default WeatherDetails