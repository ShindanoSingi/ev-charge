const router = require('express').Router();
const axios = require('axios');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { createStastion, getAllStations, getaStation, updateaStation, deleteaStation, addaStation } = require('../controller/stationController');


// Create a new station
router.post('/new-station', authMiddleware, createStastion);
// Get all stations
router.get('/get-all-stations', getAllStations);
// Get a station by id
router.get('/get-station/:id', getaStation);
// Update a station by id
router.put('/update-station/:id', authMiddleware, updateaStation);
// Delete a station by id
router.delete('/delete-station/:id', authMiddleware, deleteaStation);
// Add a station
router.post('/add-station', authMiddleware, addaStation);

// Geta station
router.get('/search/:city/:state/:country', async (req, res) => {
    const { city, state, country } = req.params;
    console.log(city, state, country);
    const searchLatLon = {
        key: process.env.OPENWEATHER_API,
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

            axios.request(options)
                .then(function (response) {
                    console.log(response.data);
                }).catch(function (error) {
                    throw new Error(error);
                });
        })
});

module.exports = router;