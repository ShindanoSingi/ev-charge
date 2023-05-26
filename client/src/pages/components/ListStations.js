import React, { useEffect, useState } from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import { useSelector } from 'react-redux';
import { setAllStations, setAllMyStations, setInputValue, setSelectedOption, setUserPosition, setApiStation, setDistanceM, setTime } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../../redux/loaderSlice';
import { getAllStations, getDistance, getTime } from '../../apiCalls/apiCalls';
import { BsEvStation } from 'react-icons/bs';
import { RiMapPin2Fill } from 'react-icons/ri';
import { FaLocationArrow } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import ReactStars from 'react-stars';
import { AiFillCar } from 'react-icons/ai';
import Loader from '../../components/Loader';
import { BsChevronRight } from 'react-icons/bs';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Station from './Station';


require('mapbox-gl/dist/mapbox-gl.css');

function ListStations({ getApiStation }) {
    const [distance, setDistance] = useState(null);
    const [placeName, setPlaceName] = useState('');
    // const [allStations, setAllStations] = useState([]);
    const { allStations, allMyStations, inputValue, selectedOption, userPosition } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const Map = ReactMapboxGl({
        accessToken: process.env.REACT_APP_MAPBOX_TOKEN
    });

    // Get the user's current position
    const getUserPosition = () => {
        console.log('Getting user position');
        navigator.geolocation.getCurrentPosition(
            position => dispatch(setUserPosition(position)),
            err => console.log(err)
        );
    };

    // const earthRaduisK = 6371; // Radius of the earth in km
    const earthRaduisM = 3959; // Radius of the earth in miles
    // const distances = getDistance(position.coords.latitude, position.coords.longitude, 44.09393, -70.20805, earthRaduisM);
    // console.log(distances);

    useEffect(() => {
        getUserPosition();
        console.log(userPosition);

        // getPlaceName(position.coords.latitude, position.coords.longitude);
        // getStations();
    }, []);




    const accessToken = 'pk.eyJ1Ijoic2hpbmRhbm8iLCJhIjoiY2xpNDVjNXc0MDZhbzNrcGhnYm95czVteSJ9.gGJMMh2SKPYSeWso3nXskg';

    const destination = [44.0941472, -70.2084129]; // Specify the origin city
    const origin = [42.393167, -71.064352]; // Specify the destination city

    const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin};${destination}.json?access_token=${accessToken}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const duration = data.routes[0].duration; // Duration in seconds
            const formattedDuration = Math.round(duration / 60); // Convert to minutes (rounded)
            console.log(`The estimated travel time between ${origin} and ${destination} is approximately ${formattedDuration} minutes.`);
        })
        .catch(error => {
            console.error('An error occurred while fetching directions:', error);
        });



    return (
        <div className='max-h-[80vh] overflow-scroll '>
            <Station />
            {
                React.Children.toArray(
                    allStations.fuel_stations?.map((station) => {

                        // dispatch(setApiStation(station))

                        return (
                            // <Link to={`/apiStation/${station.id}`} onClick={() => {
                            //     getApiStation(station)
                            // }}>
                            <div key={station.id}>
                                <div className='bg-cardBlack card text-gray-400 flex items-center justify-between p-2 gap-2 border border-l-0 border-r-0 border-t-0  border-b-[#35383F]'>
                                    <div className='flex items-center'>
                                        <div className='relative'>
                                            <BsEvStation className='text-white h-6 w-5 absolute left-[1.25rem] bg-green top-[1rem]' />
                                            <RiMapPin2Fill className='h-[3.5rem] w-[3.5rem] text-green' />
                                        </div>
                                        <div className='flex justify-between'>
                                            <div className='w-full'>
                                                <h1 className='line-clamp-1 text-white w-full mb-1'>{station?.station_name}</h1>
                                                <span className='text-sm font-light line-clamp-1 w-full'> {station?.city}, {station?.street_address}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Link to={`/apiStation/${station.id}`}>
                                            <BsChevronRight onClick={() => {
                                                dispatch(setApiStation(station))
                                                dispatch(setTime(getTime(userPosition.coords.latitude, userPosition.coords.longitude, station.latitude, station.longitude)))
                                                dispatch(setDistanceM(getDistance(userPosition.coords.latitude, userPosition.coords.longitude, station.latitude, station.longitude, earthRaduisM)))
                                            }} className='h-6 w-6 text-gray-400' />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            // </Link>
                        )
                    }))
            }






            {/* <div key={station.id}>
                                <div className='relative'>
                                    <BsEvStation className='text-white h-9 w-7 absolute left-[2rem] bg-green top-[1.2rem]' />
                                    <MdPlace className='h-[5.5rem] w-[5.3rem] text-green' />
                                </div>
                                <div className='bg-cardBlack text-gray-400 p-4 rounded-lg flex flex-col gap-4'>
                                    <div className='flex justify-between'>
                                        <div className='w-[16rem] mt-2'>
                                            <h1 className='line-clamp-1 text-white w-full'>{station.station_name}</h1>
                                            <span className='text-sm font-light line-clamp-1 w-full'> {station.city}, {station.street_address}</span>
                                        </div>
                                        <div className='w-11 h-11 rounded-full bg-green p-2 flex items-center justify-center'>
                                            <FaLocationArrow className='h-6 w-6 text-white' />
                                        </div>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <p className='text-sm'>{0}</p>
                                        <ReactStars
                                            count={5}
                                            value={3}
                                            size={15}
                                            color2={'#ffd700'}
                                        />
                                        <p className='text-sm'>( reviews)</p>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <div className='flex items-center gap-2 bg-red px-2 py-1 rounded-lg'>
                                            <p className='text-sm text-white'>In Use</p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <MdPlace className=' text-xl  text-gray-400' />
                                            <p className='text-sm'>1.9 mi</p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <AiFillCar className=' text-xl  text-gray-400' />
                                            <p className='text-sm'>7 mins</p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}





            {/* <Map
                    style="mapbox://styles/mapbox/outdoors-v12"
                    containerStyle={{
                        height: '100vh',
                        width: '100vw'
                    }}
                    center={[-70.2601336, 43.6605883]}
                >
                    <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                        <Feature coordinates={[-70.2601336, 43.6605883]} />
                    </Layer>
                </Map> */}
        </div>
    )
}

export default ListStations