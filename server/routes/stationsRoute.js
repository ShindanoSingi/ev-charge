const router = require('express').Router();
const Station = require('../models/stationModel');
const authMiddleware = require('../middlewares/authMiddleware');
const { searchStations } = require('../functions/stationsApi');

// Create a new station
router.post('/new-station', authMiddleware, async (req, res) => {
    const { name, district, streetAddress, city, state, zipCode, country, latitude, longitude, placeLink, phoneNumber, openingHours, rating, reviews, website } = req.body;

    try {
        const newStation = new Station({ name, district, streetAddress, city, state, zipCode, country, latitude, longitude, placeLink, phoneNumber, openingHours, rating, reviews, website });
        const savedStation = await newStation.save();
        res.send({
            success: true,
            message: 'Station created successfully',
            data: savedStation,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
});

// Get all stations
router.get('/get-all-stations', authMiddleware, async (req, res) => {
    try {
        const stations = await Station.find();
        res.send({
            success: true,
            message: 'Stations retrieved successfully',
            data: stations,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
});

// Get a station by id
router.get('/get-station/:id', authMiddleware, async (req, res) => {
    const station = await Station.findById(req.params.id);
    try {
        if (!station)
            return res.status(400).send({
                success: false,
                message: 'Station not found',
            });
        res.send({
            success: true,
            message: 'Station retrieved successfully',
            data: station,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
});

// Update a station by id
router.put('/update-station/:id', authMiddleware, async (req, res) => {
    const { name, district, streetAddress, city, state, zipCode, country, latitude, longitude, placeLink, phoneNumber, openingHours, rating, reviews, website } = req.body;
    const station = await Station.findById(req.params.id);
    try {
        if (!station)
            return res.status(400).send({
                success: false,
                message: 'Station not found',
            });
        const updatedStation = await Station.findByIdAndUpdate(req.params.id, { name, district, streetAddress, city, state, zipCode, country, latitude, longitude, placeLink, phoneNumber, openingHours, rating, reviews, website }, { new: true });
        res.send({
            success: true,
            message: 'Station updated successfully',
            data: updatedStation,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
});

// Delete a station by id
router.delete('/delete-station/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const station = await Station.findById(id);
    try {
        if (!station)
            return res.status(400).send({
                success: false,
                message: 'Station not found',
            });
        const deletedStation = await Station.findByIdAndDelete(id);
        res.send({
            success: true,
            message: 'Station deleted successfully',
            data: deletedStation,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
});

// Add a station to station list
router.get('/search-station', authMiddleware, async (req, res) => {
    searchStations(37.359428, -121.925337);
});

module.exports = router;