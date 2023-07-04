import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        allStations: [],
        allMyStations: [],
        inputValue: '',
        selectedOption: '',
        userPosition: null,
        apiStation: [],
        distanceM: null,
        showCard: false,
        googleAPIKey: '',
        myCity: '',
        myState: '',
        myCountry: '',
        success: false,
        token: '',
        myFavoriteStations: [],
        myStationId: '',
        myFavoriteStationsLength: 0,
        username: '',
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAllStations: (state, action) => {
            state.allStations = action.payload;
        },
        setAllMyStations: (state, action) => {
            state.allMyStations = action.payload;
        },
        setInputValue: (state, action) => {
            state.inputValue = action.payload;
        },
        setSelectedOption: (state, action) => {
            state.selectedOption = action.payload;
        },
        setUserPosition: (state, action) => {
            state.userPosition = action.payload;
        },
        setApiStation: (state, action) => {
            state.apiStation = action.payload;
        },
        setDistanceM: (state, action) => {
            state.distanceM = action.payload;
        },
        setTime: (state, action) => {
            state.time = action.payload;
        },
        setShowCard: (state, action) => {
            state.showCard = action.payload;
        },
        setGoogleAPIKey: (state, action) => {
            state.googleAPIKey = action.payload;
        },
        setMyCity: (state, action) => {
            state.myCity = action.payload;
        },
        setMyState: (state, action) => {
            state.myState = action.payload;
        },
        setMyCountry: (state, action) => {
            state.myCountry = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setMyFavoriteStations: (state, action) => {
            state.myFavoriteStations = action.payload;
        },
        setMyStationId: (state, action) => {
            state.myStationId = action.payload;
        },
        setMyFavoriteStationsLength: (state, action) => {
            state.myFavoriteStationsLength = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
    },
});

export const { setUser, setAllStations, setAllMyStations, setInputValue, setSelectedOption, setUserPosition, setApiStation, setDistanceM, setTime, setShowCard, setGoogleAPIKey, setMyCity, setMyState, setSuccess, setToken, setMyFavoriteStations, setMyStationId, setMyFavoriteStationsLength, setUsername } = userSlice.actions;
export default userSlice.reducer;