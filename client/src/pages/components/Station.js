import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BsEvStation, BsFillClockFill } from 'react-icons/bs';
import { MdPlace } from 'react-icons/md';
import { AiFillCar } from 'react-icons/ai';
import { FaLocationArrow } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { distance, getDistance } from '../../apiCalls/apiCalls';
import { setTime } from '../../redux/userSlice';
import { setShowCard } from '../../redux/userSlice';



function Station() {
    const { apiStation, userPosition, distanceM, time, showCard } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(apiStation);
    }, [apiStation])

    console.log(userPosition);

    return (

        // <div className='bg-cardBlack h-[78vh] px-4'>
        showCard && <div className='bg-[#181A20] border-white border-solid  border absolute z-50 top-[50%] right-4 rounded-lg left-4 translate-y-[-50%]'
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
                    <div className='w-11 h-11 rounded-full bg-green p-2 flex items-center justify-center'>
                        <FaLocationArrow className='h-6 w-6 text-white' />
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
                <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-2'>
                        <MdPlace className=' text-xl  text-gray-400' />
                        <p className='text-sm'>{distance(userPosition.lat, userPosition.lng, apiStation.latitude, apiStation.longitude, 3959)} mi</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <AiFillCar className=' text-xl  text-gray-400' />
                        <p className='text-sm'>{30} mins</p>
                    </div>
                </div>
                {
                    apiStation.access_days_time &&
                    <div className='flex gap-2'>
                        <BsFillClockFill />
                        <p className='text-sm text-gray-400'>{apiStation.access_days_time}</p>
                    </div>
                }
                {
                    apiStation.station_phone &&
                    <div className='flex gap-2'>
                        <FiPhoneCall />
                        <a href={apiStation.station_phone} className='text-sm text-gray-400'>{apiStation.station_phone}</a>
                    </div>
                }

            </div>
        </div>


        // </div>

    )
}

export default Station