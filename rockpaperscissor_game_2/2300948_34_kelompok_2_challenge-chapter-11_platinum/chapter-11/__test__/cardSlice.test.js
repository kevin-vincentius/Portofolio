import cardReducer, { playGame } from "../src/redux/cardSlice";

describe("gameSlice", () => {
  it("should set id 'game' to true", () => {
    const initialState = {
      games: [
        { id: "game", title: "Rock Paper Scissor", played: false },
        { id: "gamedummy", title: "Game Dummy", played: false },
        { id: "cointoss", title: "Coin Toss", played: false },
      ],
    };

    const action = playGame("game");

    // Act: Call the reducer with the initial state and the action.
    const newState = cardReducer(initialState, action);

    // Positive Test 1: Check to see if the assigned ID 'game' is set to true
    expect(newState.games).toEqual([
      { id: "game", title: "Rock Paper Scissor", played: true },
      { id: "gamedummy", title: "Game Dummy", played: false },
      { id: "cointoss", title: "Coin Toss", played: false },
    ]);
  });

  it("should set id 'gamedummy' to true", () => {
    const initialState = {
      games: [
        { id: "game", title: "Rock Paper Scissor", played: false },
        { id: "gamedummy", title: "Game Dummy", played: false },
        { id: "cointoss", title: "Coin Toss", played: false },
      ],
    };

    const action = playGame("gamedummy");

    // Act: Call the reducer with the initial state and the action.
    const newState = cardReducer(initialState, action);

    // Positive Test 2: Check to see if the assigned ID 'gamedummy' is set to true
    expect(newState.games).toEqual([
      { id: "game", title: "Rock Paper Scissor", played: false },
      { id: "gamedummy", title: "Game Dummy", played: true },
      { id: "cointoss", title: "Coin Toss", played: false },
    ]);
  });
  it("should not modify state if the game ID is not found", () => {
    const initialState = {
      games: [
        { id: "game", title: "Rock Paper Scissor", played: false },
        { id: "gamedummy", title: "Game Dummy", played: false },
        { id: "cointoss", title: "Coin Toss", played: false },
      ],
    };

    const action = playGame("nonexistent");
    const newState = cardReducer(initialState, action);

    // Negative Test 1: Check to see if playGame can be called with an ID that are not included in games
    expect(newState).toEqual(initialState);
  });
});
