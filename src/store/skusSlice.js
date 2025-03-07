import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  skus: []
};

export const skusSlice = createSlice({
  name: 'skus',
  initialState,
  reducers: {
    addSku: (state, action) => {
      state.skus.push(action.payload);
    },
    updateSku: (state, action) => {
      const index = state.skus.findIndex(sku => sku.id === action.payload.id);
      if (index !== -1) {
        state.skus[index] = action.payload;
      }
    },
    deleteSku: (state, action) => {
      state.skus = state.skus.filter(sku => sku.id !== action.payload);
    }
  }
});

export const { addSku, updateSku, deleteSku } = skusSlice.actions;
export default skusSlice.reducer;