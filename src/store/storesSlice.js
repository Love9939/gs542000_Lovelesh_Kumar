import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stores: []
};

export const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    addStore: (state, action) => {
      state.stores.push(action.payload);
    },
    updateStore: (state, action) => {
      const index = state.stores.findIndex(store => store.id === action.payload.id);
      if (index !== -1) {
        state.stores[index] = action.payload;
      }
    },
    deleteStore: (state, action) => {
      state.stores = state.stores.filter(store => store.id !== action.payload);
    }
  }
});

export const { addStore, updateStore, deleteStore } = storesSlice.actions;
export default storesSlice.reducer;