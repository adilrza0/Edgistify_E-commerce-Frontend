import { configureStore } from "@reduxjs/toolkit";
import { apiSLice } from "./slices/apiSlice";
import authReducer from "./slices/authSlice";
export const store = configureStore({
    reducer: {
        [apiSLice.reducerPath]:apiSLice.reducer,
        auth:authReducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSLice.middleware),
    devTools:true,
})
