import React from 'react'
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function Map() {
    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    )
}

export default Map

// import React, { useEffect, useRef, useState } from 'react'
// import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css'
// import { useSelector } from 'react-redux';
// import { setAllStations, setAllMyStations, setUserPosition } from '../../redux/userSlice';
// import { useDispatch } from 'react-redux';
// import { showLoader, hideLoader } from '../../redux/loaderSlice';
// import { getAllStations } from '../../apiCalls/apiCalls';

// import { RiMapPin2Fill } from 'react-icons/ri';
// import { FaLocationArrow } from 'react-icons/fa';
// import ReactStars from 'react-stars';
// import { AiFillCar } from 'react-icons/ai';
// import Loader from '../../components/Loader';
// import { BsChevronRight, BsEvStation } from 'react-icons/bs';
// import axios from 'axios';
// import { cons } from 'pos/lexicon';
// // require('mapbox-gl/dist/mapbox-gl.css');

// import { MapContainer, TileLayer } from 'react-leaflet';
// import { osm } from '../../apiCalls/apiCalls';
// import "leaflet/dist/leaflet.css";


// function MapChart() {
//     let L = window.L;
//     let map = L.map('map').setView([51.505, -0.09], 13);
//     L.tileLayer('https://title.openstreetmap.org/{z}/{x}/{y}.png', {
//         maxZoom: 19,
//         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
//     }).addTo(map);

//     L.marker([51.5, -0.09]).addTo(map)
//         .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//         .openPopup();

//     var marker = L.marker([51.5, -0.09]).addTo(map);
//     var circle = L.circle([51.508, -0.11], {
//         color: 'red',
//         fillColor: '#f03',
//         fillOpacity: 0.5,
//         radius: 500
//     }).addTo(map);

//     var polygon = L.polygon([
//         [51.509, -0.08],
//         [51.503, -0.06],
//         [51.51, -0.047]
//     ]).addTo(map);

//     marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
//     circle.bindPopup("I am a circle.");
//     polygon.bindPopup("I am a polygon.");

//     var popup = L.popup()
//         .setLatLng([51.513, -0.09])
//         .setContent("I am a standalone popup.")
//         .openOn(map);

//     function onMapClick(e) {
//         alert("You clicked the map at " + e.latlng);
//     }

//     map.on('click', onMapClick);

//     var popup = L.popup();

//     function onMapClick(e) {
//         popup
//             .setLatLng(e.latlng)
//             .setContent("You clicked the map at " + e.latlng.toString())
//             .openOn(map);
//     }

//     map.on('click', onMapClick);

//     // const [position, setPosition] = useState(null);
//     // const [distance, setDistance] = useState(null);
//     // const [placeName, setPlaceName] = useState('');
//     // const [allStations, setAllStations] = useState([]);
//     const { allStations, allMyStations, userPosition } = useSelector((state) => state.userReducer);
//     const [center, setCenter] = useState({ lat: -70.2601336, lng: 43.6605883 });
//     const ZOOM_LEVEL = 9;
//     const mapRef = useRef();


//     const dispatch = useDispatch();

//     // const Map = ReactMapboxGl({
//     //     accessToken: process.env.REACT_APP_MAPBOX_TOKEN
//     // });


//     // const getStations = async () => {
//     //     dispatch(showLoader());
//     //     axios.get(`${process.env.REACT_APP_NREL_API_URL}${process.env.REACT_APP_NREL_API_KEY}&fuel_type=ELEC&state=MA`)
//     //         .then(response => {
//     //             dispatch(showLoader());
//     //             console.log(response.data);
//     //             setAllStations(response.data);
//     //             dispatch(hideLoader());
//     //         })
//     // }


//     // async function getPlaceName(lat, lng) {
//     //     const url = `${process.env.REACT_APP_MAPBOX_URL}${lng},${lat}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;
//     //     const response = await fetch(url);
//     //     const data = await response.json();
//     //     if (data.features.length > 0) {
//     //         console.log(data);
//     //         console.log(data.features[0].place_name);
//     //         setPlaceName(data.features[0].place_name);
//     //     }
//     //     return null;
//     // }

//     // Get the user's current position
//     const getUserPosition = () => {
//         console.log('Getting user position');
//         navigator.geolocation.getCurrentPosition(
//             position => dispatch(setUserPosition(position)),
//             err => console.log(err)
//         );
//     };

//     // console.log(position.coords);

//     // Get all stations
//     // const getStations = async () => {
//     //     dispatch(showLoader());
//     //     const response = await getAllStations();
//     //     console.log(response);
//     //     setAllStations(response);
//     //     // dispatch(hideLoader());
//     // };

//     useEffect(() => {
//         getUserPosition();
//         // getPlaceName(position.coords.latitude, position.coords.longitude);
//         // getStations();
//     }, []);

//     return (
//         <div id='map' className='h-[180px]'>

//         </div>
//     )
// }

// export default MapChart