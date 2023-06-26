import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BsFillClockFill } from 'react-icons/bs';
import { MdPlace } from 'react-icons/md';
import { MdFavorite } from 'react-icons/md'
import { FaLocationArrow } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { addStation, distance } from '../../apiCalls/apiCalls';
import { setMyCity, setMyState, setUserPosition } from '../../redux/userSlice';
import { setShowCard } from '../../redux/userSlice';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import DeleteButton from './DeleteButton';


function Station() {
    const { apiStation, userPosition, showCard } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

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

    const getGeolocation = async () => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userPosition?.coords.latitude}&lon=${userPosition?.coords.longitude}`
            );

            console.log(response.data.address);

            if (response.data.address) {
                const { city, state } = response.data.address;
                dispatch(setMyCity(city));
                dispatch(setMyState(state));
            }
        } catch (error) {
            console.error(error);
        }
    };

    console.log(apiStation);

    // Add a new to favorites
    const addFavStation = async (apiStations) => {
        try {
            const res = await addStation(apiStations);
            toast.success('Station added to favorites');

        } catch (error) {
            toast.error('Station not added');
        }
    };

    useEffect(() => {
        getGeolocation();
    }, []);

    return (
        showCard && <div className='bg-[#181A20] center border-white border-solid md:max-w-[40rem] border absolute z-50 top-[50%] right-4 rounded-lg left-4 translate-y-[-50%]'
            onClick={() => {
                dispatch(setShowCard(false))
            }}>

            <div className='bg-cardBlack text-gray-400 p-4 rounded-lg flex flex-col gap-4'
            >
                <div className='flex justify-between'>
                    <div className='w-[17rem] mt-2'>
                        <h1 className='line-clamp-1 text-white w-full'>{apiStation.station_name}</h1>
                        <p className='text-sm overflow-ellipsis w-full font-light line-clamp-1 '>{apiStation.street_address},{apiStation.city} {apiStation.state} {apiStation.zip}</p>
                    </div>
                    <div className='w-11 h-11 rounded-full bg-green hover:bg-cyan-600 p-2 flex items-center justify-center'>
                        <a href={`https://www.google.com/maps/dir/${userPosition.lat},${userPosition.lng}/${apiStation.latitude},${apiStation.longitude}`} rel="noreferrer" ><FaLocationArrow
                            onClick={() => {
                                componentDidMount();
                                getGeolocation();
                            }}
                            className='h-6 w-6 text-white' /></a>
                    </div>
                </div>
                <div className='flex items-center gap-4 flex-wrap'>
                    {
                        apiStation.access_code && <p className='text-sm text-gray-400'>Access: {apiStation.access_code}</p>
                    }
                    {
                        apiStation.ev_pricing && <p className='text-sm text-gray-400'>Price: {apiStation.ev_pricing}</p>
                    }
                    {
                        apiStation.ev_connector_types && <p className='text-sm text-gray-400'>Connectors: {apiStation?.ev_connector_types[0]}</p>
                    }
                    {
                        apiStation.ev_level2_evse_num && <p className='text-sm text-gray-400'>EVSE Ports: {apiStation.ev_level2_evse_num}</p>
                    }
                </div>

                {
                    distance(userPosition?.lat, userPosition?.lng, apiStation?.latitude, apiStation?.longitude, 3959) > 0 ? <div className='flex items-center gap-2'>
                        <MdPlace className=' text-xl  text-gray-400' />
                        <p className='text-sm'>{distance(userPosition?.lat, userPosition?.lng, apiStation?.latitude, apiStation?.longitude, 3959)} mi</p>
                    </div> : ''
                }

                {
                    apiStation.access_days_time &&
                    <div className='flex gap-2'>
                        <BsFillClockFill />
                        <p className='text-sm text-gray-400'>{apiStation.access_days_time}</p>
                    </div>
                }
                <div className='flex justify-between items-center'>
                    {
                        apiStation.station_phone &&
                        <div className='flex gap-2'>
                            <FiPhoneCall />
                            <a href={apiStation.station_phone} className='text-sm text-gray-400'>{apiStation.station_phone}</a>
                        </div>
                    }
                    {
                        apiStation?.ev_connector_types ? <div className='items-center gap-2'>
                            <MdFavorite
                                onClick={() => {
                                    addFavStation(apiStation);
                                }}
                                className='hover:text-red text-4xl  text-gray-400' />
                            <p className='text-xl'>Like</p>
                        </div> : <DeleteButton />
                    }
                </div>
            </div>
        </div>
    )
}

export default Station