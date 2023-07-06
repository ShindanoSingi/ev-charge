import * as React from 'react';
import { showLoader, hideLoader } from '../../redux/loaderSlice';
import { BsSearch } from 'react-icons/bs';
import { useEffect } from 'react';
import { setInputValue, setSelectedOption, setAllStations, setUserPosition, setUsername } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { extractStateName } from './StatesNames';
import { AiOutlineMenu } from 'react-icons/ai'
import { IoSearch } from 'react-icons/io5'
import MenuButton from './MenuButton';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const pos = require('pos');


function Header() {

    const navigate = useNavigate();

    const { inputValue, selectedOption, token, username } = useSelector((state) => state.userReducer);

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

        const tagger = new pos.Tagger();
        const taggedWords = tagger.tag(words);

        const cityWords = taggedWords.find((word) => word[1] === 'NNP' && (word[0] === word[0].toUpperCase()));

        return words[0];
    }


    const getStations = async (location, fuelType) => {
        let url = `${process.env.REACT_APP_NREL_API_URL}${process.env.REACT_APP_NREL_API_KEY}`
        if (fuelType) {
            url += `&fuel_type=${fuelType}`;
        }

        if (detectZipCode(location)) {
            url += `&zip=${location}`;
        }

        if (extractCityName(location)) {
            const cityName = extractCityName(location);
            url += `&city=${cityName}`;
        }

        if (extractStateName(location)) {
            const stateName = extractStateName(location);
            url += `&state=${stateName}`;
        }

        dispatch(showLoader());
        axios.get(url)
            .then(response => {
                dispatch(showLoader());
                dispatch(
                    setAllStations(response.data),
                );
                dispatch(hideLoader());
            })
    }

    const componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch(setUserPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }));
            },

            (error) => {
                return error;
            }
        );
    }

    const getCurrentUser = async () => {
        try {
            dispatch(showLoader());
            const response = await getCurrentUser();
            console.log(response);
            dispatch(hideLoader());
            if (response.success === true) {
                dispatch(setUsername(response.user));
            }
        } catch (error) {
            dispatch(hideLoader());
            toast.error(error.response.data.message);
            navigate('/signin')
        }
    };

    useEffect(() => {
        componentDidMount();
        if (localStorage.getItem('token')) {
            getCurrentUser();
        } else {
            navigate('/signin')
        }
        console.log('token', token);
    }, [])

    return (
        <div className='header-container flex flex-row tablet-landscape:items-center tablet-landscape:gap-2 p-2 gap-1 fixed z-10 w-full top-0 bg-[#262A34]'>
            <div className='header-search flex justify-between w-full items-center'>
                <div className='flex items-center w-[96vw] gap-0 border rounded-lg border-gray-400 md:w-full'>
                    <div className='px-3 gap-2 py-1 w-full search-input flex items-center rounded-lg z-50 '>
                        <div className=''>
                            <BsSearch onClick={handleSubmit} className='text-gray-400 text-xl' />
                        </div>
                        <input placeholder="Zipcode, City or State" value={inputValue} onChange={handleInputChange} className='p-1 text-gray-400' />
                    </div>
                    <div className='bg-gray-100 p-[0.5rem] rounded-r-lg'>
                        <IoSearch onClick={handleSubmit} className='text-gray-400 text-2xl' />
                    </div>
                </div>
            </div>

            <div className='selection w-[99vw] self-center tablet-landscape:w-[50vw] flex items-center'>
                <fieldset className='text-gray-400 rounded-lg border-gray-400 border w-full px-4 '>
                    <legend>Select Fuel Type</legend>
                    <select className='option w-full text-gray-400' value={selectedOption} onChange={handleOptionChange}>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}> {option.label}</option>
                        ))}
                    </select>
                </fieldset>
                {
                    username ? <div className="bg-green mx-1 rounded-md p-1">{username}</div> : <div className='mx-1 rounded-md p-1 bg-green'>{'SignIn'}</div>
                }

                <div className='header-menu' >
                    <MenuButton />
                </div>
            </div>

        </div>
    )
}

export default Header;