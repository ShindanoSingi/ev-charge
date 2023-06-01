import React, { useEffect, useRef, useState } from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import { useSelector } from 'react-redux';
import { setAllStations, setAllMyStations, setUserPosition } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../../redux/loaderSlice';
import { getAllStations } from '../../apiCalls/apiCalls';

import { RiMapPin2Fill } from 'react-icons/ri';
import { FaLocationArrow } from 'react-icons/fa';
import ReactStars from 'react-stars';
import { AiFillCar } from 'react-icons/ai';
import Loader from '../../components/Loader';
import { BsChevronRight, BsEvStation } from 'react-icons/bs';
import axios from 'axios';
import { cons } from 'pos/lexicon';
// require('mapbox-gl/dist/mapbox-gl.css');
import { osm } from '../../apiCalls/apiCalls';
import "leaflet/dist/leaflet.css";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/south-america.json";

const markers = [
    {
        markerOffset: -30,
        name: "Buenos Aires",
        coordinates: [-58.3816, -34.6037]
    },
    { markerOffset: 15, name: "La Paz", coordinates: [-68.1193, -16.4897] },
    { markerOffset: 15, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
    { markerOffset: 15, name: "Santiago", coordinates: [-70.6693, -33.4489] },
    { markerOffset: 15, name: "Bogota", coordinates: [-74.0721, 4.711] },
    { markerOffset: 15, name: "Quito", coordinates: [-78.4678, -0.1807] },
    { markerOffset: -30, name: "Georgetown", coordinates: [-58.1551, 6.8013] },
    { markerOffset: -30, name: "Asuncion", coordinates: [-57.5759, -25.2637] },
    { markerOffset: 15, name: "Paramaribo", coordinates: [-55.2038, 5.852] },
    { markerOffset: 15, name: "Montevideo", coordinates: [-56.1645, -34.9011] },
    { markerOffset: 15, name: "Caracas", coordinates: [-66.9036, 10.4806] },
    { markerOffset: 15, name: "Lima", coordinates: [-77.0428, -12.0464] }
];

const Map = () => {
    return (
        <ComposableMap
            projection="geoAzimuthalEqualArea"
            projectionConfig={{
                rotate: [58, 20, 0],
                scale: 400
            }}
        >
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#EAEAEC"
                            stroke="#D6D6DA"
                        />
                    ))
                }
            </Geographies>
            {markers.map(({ name, coordinates, markerOffset }) => (
                <Marker key={name} coordinates={coordinates}>
                    <g
                        fill="none"
                        stroke="#FF5533"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="translate(-12, -24)"
                    >
                        <circle cx="12" cy="10" r="3" />
                        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                    </g>
                    <text
                        textAnchor="middle"
                        y={markerOffset}
                        style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                    >
                        {name}
                    </text>
                </Marker>
            ))}
        </ComposableMap>
    );
};

export default Map;


// function Maps() {


// const [position, setPosition] = useState(null);
// const [distance, setDistance] = useState(null);
// const [placeName, setPlaceName] = useState('');
// const [allStations, setAllStations] = useState([]);
// const { allStations, allMyStations, userPosition } = useSelector((state) => state.userReducer);
// const [center, setCenter] = useState({ lat: -70.2601336, lng: 43.6605883 });
// const ZOOM_LEVEL = 30;
// const mapRef = useRef();


// const dispatch = useDispatch();

// const Map = ReactMapboxGl({
//     accessToken: process.env.REACT_APP_MAPBOX_TOKEN
// });


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
// const getUserPosition = () => {
//     console.log('Getting user position');
//     navigator.geolocation.getCurrentPosition(
//         position => dispatch(setUserPosition(position)),
//         err => console.log(err)
//     );
// };

// console.log(position.coords);

// Get all stations
// const getStations = async () => {
//     dispatch(showLoader());
//     const response = await getAllStations();
//     console.log(response);
//     setAllStations(response);
//     // dispatch(hideLoader());
// };

// useEffect(() => {
//     getUserPosition();
// getPlaceName(position.coords.latitude, position.coords.longitude);
// getStations();
// }, []);

// return (
//     <div className='h-[80.3vh] overflow-scroll '>

{/* <MapContainer className='leaflet-container'
                center={center}
                zoom={ZOOM_LEVEL}
                ref={mapRef}
            >
                <TileLayer url={osm?.maptiler.url} attribution={osm?.maptiler.attribution} />
            </MapContainer> */}

{/* {
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
 */}





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
//         </div>
//     )
// }

// export default Maps 