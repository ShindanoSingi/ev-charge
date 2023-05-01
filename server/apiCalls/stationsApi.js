const axios = require('axios');
const asyncHandler = require('express-async-handler');

let latitude = '';
let longitude = '';

const searchStation = async (city, state, country) => {
    const searchLatLon = {
        key: process.env.OPENWEATHER_API,
        city: 'Lewiston',
        state: 'Maine',
        country: '',
        limit: 1,
        api: "https://api.openweathermap.org/geo/1.0/direct?q=",
    };

    axios.get(`${searchLatLon.api}${city},${state},${country}&limit=${searchLatLon.limit}&appid=${searchLatLon.key}`)
        .then((response) => {
            latitude = (response.data[0].lat);
            longitude = (response.data[0].lon);
            console.log(latitude, longitude);

            const options = {
                method: 'GET',
                url: process.env.EV_CHARGE_URL,

                params: {
                    lat: latitude,
                    lng: longitude,
                    limit: '50'
                },
                headers: {
                    'content-type': 'application/octet-stream',
                    'X-RapidAPI-Key': process.env.X_RAPID_API_KEY,
                    'X-RapidAPI-Host': process.env.X_RAPID_API_HOST
                }
            };

            axios.request(options).then(function (response) {
                console.log(response.data);
            }).catch(function (error) {
                console.error(error);
            });
        })
};

module.exports = { searchStation };