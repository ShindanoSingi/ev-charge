import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        allStations: [],
        allMyStations: [],
        inputValue: '',
        selectedOption: null,
        position: null,
        apiStation: null,
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
        setPosition: (state, action) => {
            state.position = action.payload;
        },
        setApiStation: (state, action) => {
            state.apiStation = action.payload;
        }
    },
});

export const { setUser, setAllStations, setAllMyStations, setInputValue, setSelectedOption, setPosition } = userSlice.actions;
export default userSlice.reducer;