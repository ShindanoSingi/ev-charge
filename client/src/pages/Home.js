import React from 'react'
import Loader from '../components/Loader';
import SearchForm from '../pages/SearchForm';
import ProtectedRoute from '../components/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from '../redux/loaderSlice';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import axios, * as others from 'axios';

function Home() {
    // const { loader } = useSelector(state => state.loaderReducer);
    axios.get('https://api.radar.io/v1/search/autocomplete?query=841+Broadway&near=43.6605883%2C-70.2601336', {
        headers: {
            Authorization: 'prj_live_pk_68b4a5fd8c30ffe24adfcc6e640c159d50213e4c'
        }
    })
        .then(function (response) {
            console.log(response);
        })
    return (
        <div>
            {/* {!loader && <Loader />} */}

        </div>
    )
}

export default Home