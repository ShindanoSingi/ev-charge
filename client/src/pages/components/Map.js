import React from 'react'
import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import { setApiStation, setShowCard, setUserPosition } from '../../redux/userSlice';
import { MdPlace } from 'react-icons/md';
import Station from './Station';
import LoaderPlayer from '../../components/LoaderPlayer';


function Map() {
    const { userPosition, allStations } = useSelector((state) => state.userReducer);
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

    React.useEffect(() => {
        componentDidMount();
    }, [])

    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 13
    };

    return (
        !allStations.station_locator_url ? <div className='h-[100%]'><LoaderPlayer /></div> :
            <div style={{ height: '74vh', width: '100vw', marginTop: "8rem" }}>
                <Station />
                {
                    <LoaderPlayer /> && <GoogleMapReact
                        bootstrapURLKeys={{ key: process.env.getGoogleApiKey }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        center={{ lat: userPosition?.lat, lng: userPosition?.lng }}
                    >
                        {
                            allStations.fuel_stations?.map((station) => {
                                return (
                                    <MdPlace
                                        onClick={() => {
                                            dispatch(setApiStation(station))
                                            dispatch(setShowCard(true))
                                        }}
                                        // onMouseOut={() => { dispatch(setShowCard(false)) }}
                                        className='text-red text-3xl'
                                        lat={station.latitude}
                                        lng={station.longitude}
                                    />
                                )
                            })
                        }

                    </GoogleMapReact>
                }

            </div>


    )
}

export default Map
