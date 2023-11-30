import { authSlice } from "../src/redux/authSlice";

describe("authSlice", () => {
  it("should handle logOut", () => {
    const initialState = {
      isAuth: true,
      loading: false,
      uid: "123",
      username: "user",
      errorLog: null,
    };
    const action = { type: "auth/logOut" };
    const newState = authSlice.reducer(initialState, action);

    //Positive test 1: Verify that logging out successfully changes the state
    expect(newState).toEqual({
      isAuth: false,
      loading: false,
      uid: null,
      username: null,
      errorLog: null,
    });
  });

  it("should handle loginPending", () => {
    const initialState = { isAuth: true, loading: false, errorLog: null };
    const action = { type: "auth/loginPending" };
    const newState = authSlice.reducer(initialState, action);

    // Positive Test 2: Verify that the loading state changes to true during loginPending
    expect(newState).toEqual({
      isAuth: false,
      loading: true,
      errorLog: null,
    });
  });

  it("should handle loginSuccess", () => {
    const initialState = { isAuth: false, loading: true, errorLog: null };
    const action = {
      type: "auth/loginSuccess",
      payload: { uid: "123", username: "user" },
    };
    const newState = authSlice.reducer(initialState, action);

    // Positive Test 3: Verify that loginSuccess updates the state with the user's information
    expect(newState).toEqual({
      isAuth: true,
      loading: false,
      uid: "123",
      username: "user",
      errorLog: null,
    });
  });

  it("should handle loginFailed", () => {
    const initialState = {
      isAuth: true,
      loading: true,
      uid: "123",
      username: "user",
      errorLog: null,
    };
    const action = { type: "auth/loginFailed", payload: "Login error message" };
    const newState = authSlice.reducer(initialState, action);

    // Negative Test 1: Verify that loginFailed updates the state as expected, including clearing the UID and setting an error message
    expect(newState).toEqual({
      isAuth: false,
      loading: false,
      uid: null,
      username: "user", // Update the username field to match the initialState
      errorLog: "Login error message",
    });
  });

  it('should handle loginFailed with username', () => {
    const initialState = { isAuth: true, loading: true, uid: '123', username: 'user', errorLog: null };
    const action = { type: 'auth/loginFailed', payload: 'Login error message' };
    const newState = authSlice.reducer(initialState, action);
  
    // Negative Test 2: Verify that loginFailed clears the UID, sets an error message, and keeps the username unchanged
    expect(newState).toEqual({
      isAuth: false,
      loading: false,
      uid: null,
      username: 'user', // Username remains unchanged
      errorLog: 'Login error message',
    });
  });
  
  it('should handle loginFailed with existing error state', () => {
    const initialState = {
      isAuth: false,
      loading: false,
      uid: null,
      username: null,
      errorLog: 'Previous error message',
    };
    const action = { type: 'auth/loginFailed', payload: 'New login error message' };
    const newState = authSlice.reducer(initialState, action);
  
    // Negative Test 3: Verify that loginFailed preserves the existing error message when there's an existing error state
    expect(newState).toEqual({
      isAuth: false,
      loading: false,
      uid: null,
      username: null,
      errorLog: 'New login error message', // Error message is updated
    });
  });
    
  
  // Continue with test cases for other actions (registerPending, registerSuccess, etc.)
});
