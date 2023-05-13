const router = require('express').Router();
const axios = require('axios');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { createStastion, getAllStations, getaStation, updateaStation, deleteaStation, addaStation, getMyStations, getoneOfMyStations, deleteOneOfMyStations } = require('../controller/stationController');


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
router.post('/add-station/:id', authMiddleware, addaStation);
// Geta station
router.get('/search/:location/:fuel', async (req, res) => {
    const { location, fuel } = req.params;

    axios.get(`https://developer.nrel.gov/api/alt-fuel-stations/v1.json?limit=100&api_key=${process.env.REACT_APP_NREL_API_KEY}&fuel_type=ELEC&state=ME`)
        .then(response => {
            console.log(response.data);
            res.json(response.data);

        })

    // const { city, state, country } = req.params;
    // console.log(city, state, country);
    // const searchLatLon = {
    //     key: process.env.OPENWEATHER_API,
    //     limit: 1,
    //     api: "https://api.openweathermap.org/geo/1.0/direct?q=",
    // };

    // axios.get(`${searchLatLon.api}${city},${state},${country}&limit=${searchLatLon.limit}&appid=${searchLatLon.key}`)
    //     .then((response) => {
    //         latitude = (response.data[0].lat);
    //         longitude = (response.data[0].lon);
    //         console.log(latitude, longitude);


});
// Get my stations
router.get('/my-stations', authMiddleware, getMyStations);
// Get one of my stations by id
router.get('/my-stations/:id', authMiddleware, getoneOfMyStations);
// Delete one of my stations by id
router.delete('/my-stations/:id', authMiddleware, deleteOneOfMyStations);


module.exports = router;