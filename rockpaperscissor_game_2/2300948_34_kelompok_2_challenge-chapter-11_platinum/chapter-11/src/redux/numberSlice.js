// pages/redux/numberSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  autoGeneratedNumber: 0,
};

const numberSlice = createSlice({
  name: 'number',
  initialState,
  reducers: {
    generateNumber: (state) => {
      state.autoGeneratedNumber = Math.floor(Math.random() * 1000);
    },
  },
});

export const { generateNumber } = numberSlice.actions;
export default numberSlice.reducer;
