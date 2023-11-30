import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    round: 1,
    status: null,
    scoreWin: 0,
    scoreLoss: 0,
  },
  reducers: {
    updateRound: (state, action) => {
      state.round = Math.max(action.payload, 1);
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
    updateScoreWin: (state, action) => {
      // Prevent reducing scoreWin below the current value
      state.scoreWin = Math.max(action.payload, state.scoreWin);
    },
    updateScoreLoss: (state, action) => {
      // Prevent reducing scoreLoss below the current value
      state.scoreLoss = Math.max(action.payload, state.scoreLoss);
    },
    resetSessionValue: (state) => {
      state.scoreWin = 0;
      state.scoreLoss = 0;
      state.round = 1;
    },
  },
});

export const { updateRound, updateStatus, updateScoreWin, updateScoreLoss, resetSessionValue } = gameSlice.actions;
export default gameSlice.reducer;
