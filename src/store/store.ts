import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import clickTrackingReducer from './clickTrackingSlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        clickTracking: clickTrackingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// appdispatch mantıgı nedir amacı