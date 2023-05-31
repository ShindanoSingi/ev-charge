import axios from "axios";

const baseUrl_users = "http://localhost:4000/api/users/";
const baseUrl_stations = "http://localhost:4000/api/stations/";

// Get all stations
export const getAllStations = async () => {
    try {
        const response = await axios.get(`${baseUrl_stations}search/portland/me/usa`);
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
// export const getDistance = (lat1, lon1, lat2, lon2, earthRaduis) => {
//     // const earthRaduisK = 6371; // Radius of the earth in km
//     // const earthRaduisM = 3959; // Radius of the earth in miles

//     const dLat = deg2rad(lat2 - lat1);  // deg2rad below
//     const dLon = deg2rad(lon2 - lon1);

//     const a =
//         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//         Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     const distance = earthRaduis * c;

//     console.log((distance + 0.6).toFixed(1) + ' miles');
//     return (distance + 0.6).toFixed(1); // Distance in km
// }

export const osm = {
    maptiler: {
        url: "https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=TBXZbDt5UU4DMNITROsC",
        attribution: '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        src: "https://api.maptiler.com/maps/streets-v2/?key=TBXZbDt5UU4DMNITROsC#0.0/0.00000/0.00000",
    }
}

// Calculate the time between current position and the destination
// export const getTime = (lat1, lon1, lat2, lon2) => {

//     // Create the distance matrix service object
//     const service = new window.google.maps.DistanceMatrixService();

//     const origin = { lat: lat1, lng: lon1 };
//     const destination = { lat: lat2, lng: lon2 };

//     // Define the distance matrix request
//     const request = {
//         origins: [origin],
//         destinations: [destination],
//         travelMode: window.google.maps.TravelMode.DRIVING,
//         unitSystem: window.google.maps.UnitSystem.IMPERIAL
//     };

//     // Send the distance matrix request
//     service.getDistanceMatrix(request, (response, status) => {
//         if (status === window.google.maps.DistanceMatrixStatus.OK) {
//             console.log(response);
//             const distance = response.rows[0].elements[0].distance.text;
//             const duration = response.rows[0].elements[0].duration.text;
//             console.log(distance);
//             console.log(duration);
//             return duration;
//         } else {
//             console.log('Error: ' + status);
//         }
//     });
// };