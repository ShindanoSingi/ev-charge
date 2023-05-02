const router = require('express').Router();
const Station = require('../models/stationModel');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { searchStation, searchLatLong, createStastion, getAllStations, getaStation, updateaStation, deleteaStation, addaStation } = require('../controller/stationController');

// Create a new station
router.post('/new-station', authMiddleware, createStastion);
// Get all stations
router.get('/get-all-stations', getAllStations);
// Get a station by id
router.get('/get-station/:id', getaStation);
// Update a station by id
router.put('/update-station/:id', authMiddleware, updateaStation);
// Delete a station by id
router.delete('/delete-station/:id', authMiddleware,);

// Geta station
router.get('/search/:city/:state/:country', authMiddleware, deleteaStation);

// Add a station
router.post('/add-station', authMiddleware, addaStation);

module.exports = router;