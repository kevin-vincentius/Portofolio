import gameReducer, {
  updateRound,
  updateStatus,
  updateScoreWin,
  updateScoreLoss,
  resetSessionValue,
} from "../src/redux/gameSlice";

describe("gameSlice Reducer", () => {
  it("should handle updateRound", () => {
    const initialState = { round: 1 };
    const action = updateRound(2);
    const newState = gameReducer(initialState, action);

    // Positive Test 1: Check if updateRound correctly updates the round value.
    expect(newState.round).toBe(2);
  });

  it("should handle updateStatus", () => {
    const initialState = { status: null };
    const action = updateStatus("Win");
    const newState = gameReducer(initialState, action);

    // Positive Test 2: Check if updateStatus correctly updates the status.
    expect(newState.status).toBe("Win");
  });

  it("should handle updateScoreWin", () => {
    const initialState = { scoreWin: 0 };
    const action = updateScoreWin(5);
    const newState = gameReducer(initialState, action);

    // Positive Test 3: Check if updateScoreWin correctly updates the scoreWin value.
    expect(newState.scoreWin).toBe(5);
  });

  it("should handle updateScoreLoss", () => {
    const initialState = { scoreLoss: 0 };
    const action = updateScoreLoss(3);
    const newState = gameReducer(initialState, action);

    // Positive Test 4: Check if updateScoreLoss correctly updates the scoreLoss value.
    expect(newState.scoreLoss).toBe(3);
  });

  it("should handle resetSessionValue", () => {
    const initialState = { scoreWin: 5, scoreLoss: 3, round: 2 };
    const action = resetSessionValue();
    const newState = gameReducer(initialState, action);

    // Positive Test 6: Check if resetSessionValue correctly resets session values.
    expect(newState.scoreWin).toBe(0);
    expect(newState.scoreLoss).toBe(0);
    expect(newState.round).toBe(1);
  });

  it('should handle updateRound with a negative value', () => {
    const initialState = { round: 1 };
    const action = updateRound(-1); // Use a negative value

    const newState = gameReducer(initialState, action);

    // Negative Test 1: Check if updateRound correctly handles a negative value.
    expect(newState.round).toBe(1); // Should not change the value.
  });

  it('should not allow updating scoreWin to a negative value', () => {
    const initialState = { scoreWin: 5 };
    const action = updateScoreWin(-3);
    const newState = gameReducer(initialState, action);
    expect(newState.scoreWin).toBe(5);
  });
    
  it('should not allow updating scoreLoss to a negative value', () => {
    const initialState = { scoreLoss: 2 };
    const action = updateScoreLoss(-1);
    const newState = gameReducer(initialState, action);
    expect(newState.scoreLoss).toBe(2);
  });
  
});
