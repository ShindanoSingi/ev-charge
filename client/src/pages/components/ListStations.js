import React, { useEffect } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useSelector } from 'react-redux';
import { setApiStation, setShowCard } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { BsEvStation } from 'react-icons/bs';
import { RiMapPin2Fill } from 'react-icons/ri';
import { BsChevronRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Station from './Station';
import LoaderPlayer from '../../components/LoaderPlayer';


function ListStations({ getApiStation }) {
    const { allStations, allMyStations, inputValue, selectedOption, userPosition, showCard } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    // const earthRaduisK = 6371; // Radius of the earth in km
    const earthRaduisM = 3959; // Radius of the earth in miles

    return (
        !allStations.station_locator_url ? <div className='h-[100%] child w-screen'><LoaderPlayer /></div> :
            <div className='h-[100vh] w-screen mt-[8.9rem] overflow-scroll '>
                <Station />
                {
                    React.Children.toArray(
                        allStations.fuel_stations?.map((station) => {
                            return (
                                <div key={station.id} onMouseUp={() => {
                                    dispatch(setShowCard(true))
                                    dispatch(setApiStation(station))
                                }}>
                                    <div className='bg-cardBlack card text-gray-400 flex items-center justify-between p-2 gap-2 border border-l-0 border-r-0 border-t-0  border-b-[#35383F]'>
                                        <div className='flex items-center'>
                                            <div className='relative'>
                                                <BsEvStation className='text-white h-6 w-5 z-1 absolute left-[1.25rem] bg-green top-[1rem]' />
                                                <RiMapPin2Fill className='h-[3.5rem] w-[3.5rem] text-green' />
                                            </div>
                                            <div className='justify-between'>
                                                <div className='w-full'>
                                                    <h1 className='line-clamp-1 text-white w-full mb-1'>{station?.station_name}</h1>
                                                    <span className='text-sm font-light line-clamp-1 w-full'> {station?.city}, {station?.street_address}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <Link>
                                                <BsChevronRight className='h-6 w-6 text-gray-400' />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }))
                }
            </div>
    )
}

export default ListStations