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