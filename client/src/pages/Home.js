import React from 'react'
import Loader from '../components/Loader';
import SearchForm from './components/SearchForm';
import ProtectedRoute from '../components/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from '../redux/loaderSlice';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import axios, * as others from 'axios';
import Map from './components/Map';

function Home() {
    // const { loader } = useSelector(state => state.loaderReducer);
    return (
        <div>
            {/* {!loader && <Loader />} */}
            <Map />
        </div>
    )
}

export default Home