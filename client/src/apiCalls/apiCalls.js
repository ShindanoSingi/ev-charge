import axios from "axios";

const baseUrl_users = "http://localhost:4000/api/users/";
const baseUrl_stations = "http://localhost:4000/api/stations/";

// Get all stations
export const getAllStations = async () => {
    try {
        const response = await axios.get(`${baseUrl_stations}search/portland/me/usa`)
        // console.log((response.data[0]));
        return response.data[0];
    } catch (error) {
        return error.response.data;
    }
};

// Convert degrees to radians
const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
}

// Get distance between two points
export const getDistance = (lat1, lon1, lat2, lon2, earthRaduis) => {
    // const earthRaduisK = 6371; // Radius of the earth in km
    // const earthRaduisM = 3959; // Radius of the earth in miles

    const dLat = deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = deg2rad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLat / 2) *
        Math.sin(dLat / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRaduis * c;

    return distance; // Distance in km
}