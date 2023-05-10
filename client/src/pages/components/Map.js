import React, { useEffect, useState } from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import { useSelector } from 'react-redux';
import { setAllStations, setAllMyStations } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../../redux/loaderSlice';
import { getAllStations } from '../../apiCalls/apiCalls';
import { BsEvStation } from 'react-icons/bs';
import { MdPlace } from 'react-icons/md';
import { FaLocationArrow } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import ReactStars from 'react-stars';
import { AiFillCar } from 'react-icons/ai';
import Loader from '../../components/Loader';
import axios from 'axios';
require('mapbox-gl/dist/mapbox-gl.css');


function Map() {
    const [position, setPosition] = useState(null);
    const [distance, setDistance] = useState(null);
    const [placeName, setPlaceName] = useState('');
    const [allStations, setAllStations] = useState([]);
    // const { allStations, allMyStations } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const Map = ReactMapboxGl({
        accessToken: process.env.REACT_APP_MAPBOX_TOKEN
    });


    const getStations = async () => {
        // axios.get('https://api.openchargemap.io/v3/poi/?output=json&countrycode=US&maxresults=100&compact=true&verbose=false&key=27a33e89-32a2-4837-9325-352522d8d890')
        //     .then(response => {
        //         dispatch(showLoader());
        //         console.log(response.data);
        //         setAllStations(response.data);
        //         dispatch(hideLoader());
        //     })

        // axios.get('https://enode-api.sandbox.enode.io/chargers', {
        //     headers: {
        //         'Authorization': '541c209b-0c17-4cbe-bd0c-6bdb1a4d39e1',
        //         'Enode-User-Id': '62010a90dea162611e9e78f9b81488e86156ba22'
        //     }
        // })
        //     .then(response => {
        //         console.log(response.data);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });


    }


    // async function getPlaceName(lat, lng) {
    //     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;
    //     const response = await fetch(url);
    //     const data = await response.json();
    //     if (data.features.length > 0) {
    //         console.log(data.features[0].text);
    //         setPlaceName(data.features[0].text);
    //     }
    //     return null;
    // }

    // Get the user's current position
    const getUserPosition = () => {
        console.log('Getting user position');
        navigator.geolocation.getCurrentPosition(
            position => setPosition(position),
            err => console.log(err)
        );
    };

    // Get all stations
    // const getStations = async () => {
    //     dispatch(showLoader());
    //     const response = await getAllStations();
    //     setAllStations(response);
    //     // dispatch(hideLoader());
    // };

    // Convert degrees to radians
    const deg2rad = (deg) => {
        return deg * (Math.PI / 180)
    }

    // Get distance between two points
    const getDistance = (lat1, lon1, lat2, lon2, earthRaduis) => {
        // const earthRaduisK = 6371; // Radius of the earth in km
        // const earthRaduisM = 3959; // Radius of the earth in miles

        const dLat = deg2rad(lat2 - lat1);  // deg2rad below
        const dLon = deg2rad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLat / 2) *
            Math.sin(dLat / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = earthRaduis * c;

        setDistance(distance);
    }

    useEffect(() => {
        getUserPosition();
        getStations();
    }, []);


    return (
        <div>
            <div className='p-4'>
                {
                    allStations?.map((station) => {

                        return (

                            <div key={station.id}>
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
                            </div>
                        )
                    })
                }

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
        </div >
    )
}

export default Map