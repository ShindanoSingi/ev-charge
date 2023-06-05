import React from 'react'
import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import { getGoogleApiKey } from '../../apiCalls/apiCalls';
import { setUserPosition } from '../../redux/userSlice';
import { MdPlace } from 'react-icons/md';
import Station from './Station';


function Map() {

    const { userPosition, allStations } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        lat: 44.0941308,
        lng: -70.2084584
    });

    const componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch(setUserPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }));
            },

            (error) => console.log(error.message)
        );
    }

    React.useEffect(() => {
        componentDidMount();
        console.log(userPosition);
    }, [])


    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 14
    };


    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100vw' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: getGoogleApiKey }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                center={{ lat: userPosition?.lat, lng: userPosition?.lng }}
            >
                {
                    allStations.fuel_stations?.map((station) => {
                        return (
                            <MdPlace
                                className='text-red text-2xl'
                                lat={station.latitude}
                                lng={station.longitude}
                            />
                        )
                    })
                }

            </GoogleMapReact>
        </div>
    )
}

export default Map
