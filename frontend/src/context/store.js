import {configureStore} from '@reduxjs/toolkit';
import userReducer from "./slices/authSlice"
import coupleReducer from "./slices/coupleSlice"
export const store = configureStore({
    reducer:{
        user: userReducer,
        couple: coupleReducer
    }
});