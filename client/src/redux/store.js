import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
        userReducer,
        loaderReducer,
    }
});

export default store;