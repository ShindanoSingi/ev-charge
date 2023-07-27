import axios from "axios"
import { axiosInstance } from "./index"

const baseUrl_users = "http://localhost:4000/api/users/"
const baseUrl_stations = "http://localhost:4000/api/stations/"

// Login the user
export const LoginUser = async(user) => {
  try {
    const response = await axiosInstance.post("/api/users/login", user);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

// Register the user
export const RegisterUser = async(user) => {
  try {
    const response = await axiosInstance.post("/api/users/register", user);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}



// Add my station
export const AddStation = async (station) => {
  const myStation = {
    station_name: station.station_name,
    street_address: station.street_address,
    city: station.city,
    state: station.state,
    latitude: station.latitude,
    longitude: station.longitude,
    zip: station.zip,
    country: station.country,
    access_code: station.access_code,
    ev_pricing: station.ev_pricing,
    ev_connector_type: station.ev_connector_type,
    ev_level2_evse_num: station.ev_level2_evse_num,
    access_days_time: station.access_days_time,
    station_phone: station.station_phone
  }

  try {
    const response = await axiosInstance.post("/api/stations/new-station", myStation);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

// Delete my station
export const DeleteStation = async (stationId) => {
  try {
    const response = await axiosInstance.delete(`/api/stations/my-station/${stationId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }




  // await axios
  //   .delete(`${baseUrl_stations}my-station/${stationId}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json"
  //     }
  //   })
  //   .then((response) => {
  //     return response
  //   })
  //   .catch((error) => {
  //     return error.response
  //   })
}

// Get all my favorites stations
export const GetFavoritesStations = async (token) => {
  try {
    const response = await axiosInstance.get(`/api/stations/get-all-stations`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }

  // try {
  //   const response = await axios.get(`${baseUrl_stations}get-all-stations`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json"
  //     }
  //   })
  //   return response.data
  // } catch (error) {
  //   return error.response.data
  // }
}

// Get all stations
export const GetAllStations = async () => {
  try {
    const response = await axios.get(
      `${baseUrl_stations}search/portland/me/Elec`
    )
    return response.data[0]
  } catch (error) {
    return error.response.data
  }
}

// Convert degrees to radians
const deg2rad = (deg) => {
  return deg * (Math.PI / 180)
}

// Get distance between two points
export const getDistance = (lat1, lon1, lat2, lon2, earthRaduis) => {
  // const earthRaduisK = 6371; // Radius of the earth in km
  // const earthRaduisM = 3959; // Radius of the earth in miles

  const dLat = deg2rad(lat2 - lat1) // deg2rad below
  const dLon = deg2rad(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const distance = earthRaduis * c

  return (distance + 0.6).toFixed(1) // Distance in km
}

// Get the distance between two points
export const distance = (lat1, lon1, lat2, lon2, earthRaduis) => {
  let nDistance = 0
  if (lat1 && lon1 && lat2 && lon2) {
    nDistance = getDistance(lat1, lon1, lat2, lon2, earthRaduis)
  }
  return nDistance
}

export const GetCurrentUser = async () => {
  try {
    const response = await axios.get(`${baseUrl_users}current-user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    console.log(response.data.data.token)
    return response.data
  } catch (error) {
    return error.response.data
  }
}
