import React from 'react'
import Loader from '../components/Loader';

import ProtectedRoute from '../components/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from '../redux/loaderSlice';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import axios, * as others from 'axios';
import Map from './components/ListStations';

import { Routes, Route } from 'react-router-dom';

function Home() {
    // const { loader } = useSelector(state => state.loaderReducer);
    return (
        <div className='bg-cardBlack'>
            {/* {!loader && <Loader />} */}
            <Map />
        </div>
    )
}

export default Home