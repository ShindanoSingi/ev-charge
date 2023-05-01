const axios = require('axios');

export const searchStation = async (lat, lng) => {
    const options = {
        method: 'GET',
        url: 'https://ev-charge-finder.p.rapidapi.com/search-by-coordinates-point',
        params: {
            lat: lat,
            lng: lng,
            limit: '50'
        },
        headers: {
            'content-type': 'application/octet-stream',
            'X-RapidAPI-Key': '60ea00e92cmsh3ad9d171eb4d9cbp1af902jsn36bf0d650e08',
            'X-RapidAPI-Host': 'ev-charge-finder.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}