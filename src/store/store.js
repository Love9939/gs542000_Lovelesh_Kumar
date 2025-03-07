import { configureStore } from '@reduxjs/toolkit';
import storesReducer from './storesSlice';
import skusReducer from './skusSlice';

export const store = configureStore({
  reducer: {
    stores: storesReducer,
    skus: skusReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;