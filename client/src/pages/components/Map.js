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
require('mapbox-gl/dist/mapbox-gl.css');


function Map() {
    const [placeName, setPlaceName] = useState('');
    const { allStations, allMyStations } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const Map = ReactMapboxGl({
        accessToken: process.env.REACT_APP_MAPBOX_TOKEN
    });


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

    const ratingChanged = (newRating) => {
        console.log(newRating)
    };

    const getStations = async () => {
        dispatch(showLoader());
        const response = await getAllStations();
        console.log(response);
        dispatch(setAllStations(response.data));
        dispatch(hideLoader());
    };

    useEffect(() => {
        getStations();
    }, []);

    return (
        <div>
            <div className='p-4'>
                {
                    allStations?.map((station) => {

                        return (

                            <div key={uuidv4()}>
                                <div className='relative'>
                                    <BsEvStation className='text-white h-9 w-7 absolute left-[2rem] bg-green top-[1.2rem]' />
                                    <MdPlace className='h-[5.5rem] w-[5.3rem] text-green' />
                                </div>
                                <div className='bg-cardBlack text-gray-400 p-4 rounded-lg'>
                                    <div className='flex justify-between'>
                                        <div className='w-[16rem]'>
                                            <h1 className='line-clamp-1 text-white w-full'>{station.name}</h1>
                                            <span className='text-sm font-light line-clamp-1 w-full'> {station.address_components.city}, {station.address_components.street_address}</span>
                                        </div>
                                        <div className='w-11 h-11 rounded-full bg-green p-2 flex items-center justify-center'>
                                            <FaLocationArrow className='h-6 w-6 text-white' />
                                        </div>
                                    </div>
                                    <div>
                                        <p>{station.rating}</p>
                                        <ReactStars
                                            className='text-[22px]'
                                            count={5}
                                            value={station.rating}
                                            size={24}
                                            color2={'#ffd700'} />
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