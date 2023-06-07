import React from 'react'
import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import { getGoogleApiKey } from '../../apiCalls/apiCalls';
import { setApiStation, setShowCard, setUserPosition } from '../../redux/userSlice';
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
        zoom: 13
    };

    return (
        <div style={{ height: '74vh', width: '100vw', marginTop: "7.8rem" }}>
            <Station />
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
                                onMouseOver={() => {
                                    dispatch(setApiStation(station))
                                    dispatch(setShowCard(true))
                                }}
                                onMouseOut={() => { dispatch(setShowCard(false)) }}
                                className='text-red text-3xl'
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
