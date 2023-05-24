import React, { useEffect, useState } from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import { useSelector } from 'react-redux';
import { setAllStations, setAllMyStations } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../../redux/loaderSlice';
import { getAllStations } from '../../apiCalls/apiCalls';
import { BsEvStation } from 'react-icons/bs';
import { RiMapPin2Fill } from 'react-icons/ri';
import { FaLocationArrow } from 'react-icons/fa';
import ReactStars from 'react-stars';
import { AiFillCar } from 'react-icons/ai';
import Loader from '../../components/Loader';
import { BsChevronRight } from 'react-icons/bs';
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


    // const getStations = async () => {
    //     dispatch(showLoader());
    //     axios.get(`${process.env.REACT_APP_NREL_API_URL}${process.env.REACT_APP_NREL_API_KEY}&fuel_type=ELEC&state=MA`)
    //         .then(response => {
    //             dispatch(showLoader());
    //             console.log(response.data);
    //             setAllStations(response.data);
    //             dispatch(hideLoader());
    //         })
    // }


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
            position => setPosition(position),
            err => console.log(err)
        );
    };

    // console.log(position.coords);

    // Get all stations
    // const getStations = async () => {
    //     dispatch(showLoader());
    //     const response = await getAllStations();
    //     console.log(response);
    //     setAllStations(response);
    //     // dispatch(hideLoader());
    // };

    useEffect(() => {
        getUserPosition();
        // getPlaceName(position.coords.latitude, position.coords.longitude);
        // getStations();
    }, []);

    return (
        <div>
            <div className=''>
                <div className='max-h-[80vh] overflow-scroll '>
                    {
                        allStations.fuel_stations?.map((station) => {
                            return (
                                <div key={station.id}>
                                    <div className='bg-cardBlack card text-gray-400 flex items-center justify-between p-2 gap-2 border border-l-0 border-r-0 border-t-0  border-b-[#35383F]'>
                                        <div className='flex items-center'>
                                            <div className='relative'>
                                                <BsEvStation className='text-white h-6 w-5 absolute left-[1.25rem] bg-green top-[1rem]' />
                                                <RiMapPin2Fill className='h-[3.5rem] w-[3.5rem] text-green' />
                                            </div>
                                            <div className='flex justify-between'>
                                                <div className='w-full'>
                                                    <h1 className='line-clamp-1 text-white w-full mb-1'>{station.station_name}</h1>
                                                    <span className='text-sm font-light line-clamp-1 w-full'> {station.city}, {station.street_address}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <BsChevronRight className='h-6 w-6 text-gray-400' />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>





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
        </div >
    )
}

export default Map