const axios = require('axios');
const Station = require('../models/stationModel');
const asyncHandler = require('express-async-handler');

let latitude = '';
let longitude = '';

const createStastion = asyncHandler(async (req, res) => {
    const station = await Station.findOne({ name: req.body.name });

    try {
        if (station) {
            return res.status(400).send({
                success: false,
                message: 'Station already exists',
            });
        }

        const newStation = await Station.create(req.body);

        res.send({
            success: true,
            message: 'Station created successfully',
            data: newStation,
        })
    } catch (error) {
        res.send({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
});

const getAllStations = asyncHandler(async (req, res) => {
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
}
);

const getaStation = asyncHandler(async (req, res) => {
    const station = await Station.findById(req.params.id);
    try {

        if (!station) {
            return res.send({
                success: false,
                message: 'Station not found',
            });
        }

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

const updateaStation = asyncHandler(async (req, res) => {
    const station = await Station.findById(req.params.id);
    try {
        if (!station)
            return res.status(400).send({
                success: false,
                message: 'Station not found',
            });
        const updatedStation = await Station.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
}
);

const deleteaStation = asyncHandler(async (req, res) => {
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
}
);

const addaStation = asyncHandler(async (req, res) => {
    const id = req.user;
    console.log(req);
});

module.exports = { createStastion, getAllStations, getaStation, updateaStation, deleteaStation, addaStation };