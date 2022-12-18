import React, {useState} from 'react';
import { UilSearch } from "@iconscout/react-unicons";


function SearchInput({setQuery}) {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== '') 
      setQuery({q: city})
  };

  const handleEnterClick = (e) => {
    if((e.keyCode === 13) && (city !== '')){
      e.preventDefault(); // ensure it is only this code that runs
      setQuery({q: city})
    }
  };

  return (

  <div className='flex flex-row justify-center my-6'>
    <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
        <input 
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text" 
          placeholder='Weather in your city...'
          className='text-xl font-light p-4 w-full shadow-xl focus:outline-none rounded-xl' 
          onKeyDown={(e) => handleEnterClick(e)}
         />
         <UilSearch 
           size={25} 
           className='text-white cursur-pointer transition ease-out hover:scale-125' 
           onClick={handleSearchClick}
         />
    </div>
  </div>
  );
}

export default SearchInput