import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        allStations: [],
        allMyStations: [],
        inputValue: '',
        selectedOption: null,
        userPosition: null,
        apiStation: [],
        distanceM: null,
        time: null,
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
    },
});

export const { setUser, setAllStations, setAllMyStations, setInputValue, setSelectedOption, setUserPosition, setApiStation, setDistanceM, setTime } = userSlice.actions;
export default userSlice.reducer;