const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    station_name: {
        type: String,
    },
    street_address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zip: {
        type: Number,
    },
    country: {
        type: String,
    },
    access_code: {
        type: Number,
    },
    ev_pricing: {
        type: Number,
    },
    ev_connector_type: {
        type: String,
    },
    ev_level2_evse_num: {
        type: Number,
    },
    access_days_time: {
        type: String,
    },
    station_phone: {
        type: String,
    },
});

const Station = mongoose.model('Station', stationSchema);
module.exports = Station;
