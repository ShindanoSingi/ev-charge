import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { showLoader, hideLoader } from '../../redux/loaderSlice';
import { BsSearch } from 'react-icons/bs';
import { useEffect } from 'react';
import { setInputValue, setSelectedOption, setAllStations, setUserPosition } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { extractStateName } from './StatesNames';
const pos = require('pos');



function SearchForm() {
    const { inputValue, selectedOption } = useSelector((state) => state.userReducer);

    const options = [
        { value: '', label: '' },
        { value: 'BD', label: 'Biodiesel (B20 and above)' },
        { value: 'CNG', label: 'Compressed Natural Gas (CNG)' },
        { value: 'ELEC', label: 'Electric' },
        { value: 'E85', label: 'Ethanol (E85)' },
        { value: 'HY', label: 'Hydrogen' },
        { value: 'LNG', label: 'Liquefied Natural Gas (LNG)' },
        { value: 'LPG', label: 'Propane (LPG)' },
        { value: 'RD', label: 'Renewable Diesel (R20 and above)' }
    ]

    const handleOptionChange = (event) => {
        dispatch(setSelectedOption(event.target.value));
    };

    const handleInputChange = (event) => {
        dispatch(setInputValue(event.target.value));
    };

    const handleSubmit = (event) => {

        getStations(inputValue, selectedOption);
    }

    const dispatch = useDispatch();

    // Detect zip code
    const detectZipCode = (location) => {
        const zipCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;
        return zipCodeRegex.test(location);
    }

    // Extract city name from location
    const extractCityName = (location) => {
        const tokenizer = new pos.Lexer();
        const words = tokenizer.lex(location);

        console.log(words[0]);

        const tagger = new pos.Tagger();
        const taggedWords = tagger.tag(words);

        const cityWords = taggedWords.find((word) => word[1] === 'NNP' && (word[0] === word[0].toUpperCase()));


        console.log(words[0]);
        return words[0];

    }

    const getStations = async (location, fuelType) => {
        let url = `${process.env.REACT_APP_NREL_API_URL}${process.env.REACT_APP_NREL_API_KEY}`
        if (fuelType) {
            url += `&fuel_type=${fuelType}`;
        }

        if (detectZipCode(location)) {
            console.log('Zip code detected');
            url += `&zip=${location}`;
        }

        if (extractCityName(location)) {
            console.log('City name detected');
            const cityName = extractCityName(location);
            url += `&city=${cityName}`;
        }

        if (extractStateName(location)) {
            console.log('State name detected');
            const stateName = extractStateName(location);
            url += `&state=${stateName}`;
        }


        dispatch(showLoader());
        axios.get(url)
            .then(response => {
                dispatch(showLoader());
                console.log(response.data);
                dispatch(
                    setAllStations(response.data),
                );
                dispatch(hideLoader());
            })
    }

    // async function getPlaceName(lat, lng) {
    //     const url = `${process.env.REACT_APP_MAPBOX_URL}${lng},${lat}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;
    //     const response = await fetch(url);
    //     const data = await response.json();
    //     if (data.features.length > 0) {
    //         console.log(data);
    //         console.log(data.features[0].place_name);
    //         setPlaceName(data.features[0].place_name);
    //     }
    //     return null;
    // }

    // Get the user's current position
    const getUserPosition = () => {
        console.log('Getting user position');
        navigator.geolocation.getCurrentPosition(
            position => dispatch(setUserPosition(position)),
            err => console.log(err)
        );
    };

    // console.log(inputValue, selectedOption)

    useEffect(() => {
        getUserPosition();
        // getPlaceName(position.coords.latitude, position.coords.longitude);
        getStations(inputValue, selectedOption);
    }, []);

    return (

        <div className='flex p-2 fixed w-full top-0 flex-col justify-center items-center bg-[#262A34]'>
            <div className=' p-2 w-full gap-4  search-input flex items-center rounded-lg z-50'>
                <BsSearch onClick={handleSubmit} className='text-gray-400 text-lg' />
                <input placeholder="Zipcode, City or State" value={inputValue} onChange={handleInputChange} className='p-1 text-gray-400 border-2 border-green w-full' />
            </div>
            <div className='w-42 flex flex-col items-end'>
                <label className='text-gray-400'>Select Fuel Type</label>
                <select className='option w-full bg-[#262A34] text-gray-400' value={selectedOption} onChange={handleOptionChange}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}> {option.label}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default SearchForm