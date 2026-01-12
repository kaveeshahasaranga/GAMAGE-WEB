import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { apiSlice } from './apiSlice';
import cartSliceReducer from './cartSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;
