const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    district: {
        type: String,
    },
    streetAddress: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zipCode: {
        type: Number,
    },
    country: {
        type: String,
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
    placeLink: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    openingHours: {
        Monday: String,
        Tuesday: String,
        Wednesday: String,
        Thursday: String,
        Friday: String,
        Saturday: String,
        Sunday: String,
    },
    rating: Number,
    reviews: Number,
    website: String,
});

const Station = mongoose.model('Station', stationSchema);
module.exports = Station;
