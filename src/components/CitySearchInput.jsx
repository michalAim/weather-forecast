import React, { useState, useEffect } from 'react';
import _ from "lodash";
import { UilSearch } from "@iconscout/react-unicons";


const CitySearchInput = ({setQuery, setUnits, units}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  //order the json object:
  let data = require('../services/cities.json');
  data = _.map(data, (city) => {
    return [
        city.name,
        city.country
    ]
  });
  data =_.uniq(data);

  const getCitySuggestions = (inputValue) => {
    return data.filter((item) => item[0].toLowerCase().startsWith(inputValue.toLowerCase()));
  };

  useEffect(() => {
    if (inputValue.length > 2) {
      // fetch city suggestions from a server or a local data source
      const newSuggestions = getCitySuggestions(inputValue);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);


  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleSuggestionClick = (suggestion) => {
    let location = suggestion.toString().split(",");
    setInputValue(location[0]);
    setSuggestions([]);
  };

  const handleSearchClick = () => {
    if (inputValue !== '') 
      setQuery({q: inputValue});
      setSuggestions([]);
  };

  const handleEnterClick = (e) => {
    if((e.keyCode === 13) && (inputValue !== '')){
      e.preventDefault(); // ensure it is only this code that runs
      setQuery({q: inputValue});
      setSuggestions([]);
    }
  };

  const handleUnitsChanged = (e) => {
    if (e.target.checked){
      setUnits('imperial');
    } else {
       setUnits('metric');
    }
  };


  return (
    <>
        <div className='flex flex-row justify-center my-6'>
            <div className='flex flex-col w-full md:w-3/4 items-center justify-center'>
                <input 
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.currentTarget.value);
                }}
                type="text" 
                placeholder='Weather in your city...'
                className='text-sm md:text-xl font-light p-4 w-full shadow-xl focus:outline-none rounded-xl' 
                onKeyDown={(e) => handleEnterClick(e)}
                />
                {
                    suggestions.length > 0 && (
                        <div className='flex p-4 rounded-xl overflow-y-scroll max-h-44 w-full text-white text-sm border border-white'>
                            <ul className=''>
                                {
                                suggestions.map((suggestion) => (
                                    <li className='transition ease-out hover:scale-105' key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
                                    {suggestion[0]+ ' ('+ suggestion[1]+ ')'}
                                    </li>
                                ))
                                }
                            </ul>
                        </div>
                    )
                }
            </div>
            <div className='flex flex-row text-white justify-center p-4'>
                <UilSearch 
                    size={25} 
                    className='text-white cursur-pointer transition ease-out hover:scale-125' 
                    onClick={handleSearchClick}
                />
                <div className='flex flex-col text-xs'>
                    <label className='text-xs'>C|F</label>
                    <input 
                    type='checkbox'
                    value = {units}
                    onChange={handleUnitsChanged}
                    />
                </div>
            </div>
        </div>
    </>
  );
};

export default CitySearchInput;
