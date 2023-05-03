import React, { useEffect } from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import { useSelector } from 'react-redux';
import { setAllStations, setAllMyStations } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../../redux/loaderSlice';
import { getAllStations } from '../../apiCalls/apiCalls';
import { BsEvStation } from 'react-icons/bs';
import { MdPlace } from 'react-icons/md';
require('mapbox-gl/dist/mapbox-gl.css');


function Map() {
    const { allStations, allMyStations } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const Map = ReactMapboxGl({
        accessToken: process.env.REACT_APP_MAPBOX_TOKEN
    });

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
            <div>
                {
                    allStations.map((station) => {
                        return (
                            <div>
                                <div className='relative'>
                                    <BsEvStation className='text-white h-9 w-7 absolute left-[2rem] bg-green top-[1.2rem]' />
                                    <MdPlace className='h-[5.5rem] w-[5.3rem] text-green' />
                                </div>

                                <h1>{station.name}</h1>
                                <h1>{station.address}</h1>
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