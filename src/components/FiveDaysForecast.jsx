import React from 'react'
import { iconUrlFromCode } from '../services/weatherService'

function FiveDaysForecast({items}) {
  return <div>
    <div className='flex items-center justify-start mt-6'>
        <p className='text-white font-medium uppercase'>daily forecast for the next days:</p>
    </div>
    <hr className='my-6'/>
    <div className='flex flex-row items-center justify-between text-white'>

        {items.map((item, key) => (
            <div key={key} className='flex flex-col items-center justify-center'>
                <p className='font-light text-sm'>{item.title}</p>
                <img 
                    src={iconUrlFromCode(item.icon)} 
                    alt={`icon for ${item.title}`}
                    className='w-12 my-1'  
                    />
                <p className='font-medium'>{`${item.temp.toFixed()}°`}</p>
            </div> 
        ))}
    </div>
  </div>
}

export default FiveDaysForecast