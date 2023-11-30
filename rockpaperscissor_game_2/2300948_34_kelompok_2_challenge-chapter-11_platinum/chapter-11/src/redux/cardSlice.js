// gameSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  games: [
    { id: 'game', title: 'Rock Paper Scissor', played: false },
    { id: 'gamedummy', title: 'Game Dummy', played: false },
    { id: 'cointoss', title: 'Coin Toss', played: false },
  ],
};

const cardSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    playGame(state, action) {
      const gameId = action.payload;
      const game = state.games.find(game => game.id === gameId);
      if (game) {
        game.played = true;
      }
    },
  },
});

export const { playGame } = cardSlice.actions;
export const selectGames = state => state.game.games;
export default cardSlice.reducer;
