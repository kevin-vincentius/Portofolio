import profileReducer, {
  setUserData,
  setBio,
  setCity,
  setEditMode,
} from "../src/redux/profileSlice";

describe("profileSlice Reducer", () => {
  it("should handle setUserData", () => {
    const initialState = { userData: null };
    const action = setUserData({ name: "John", email: "john@example.com" });
    const newState = profileReducer(initialState, action);

    // Positive Test 1 : Check if setUserData correctly updates the userData.
    expect(newState.userData).toEqual({
      name: "John",
      email: "john@example.com",
    });
  });

  it("should handle setBio", () => {
    const initialState = { bio: "" };
    const action = setBio("This is my bio.");
    const newState = profileReducer(initialState, action);

    // Positive Test 2 : Check if setBio correctly updates the bio.
    expect(newState.bio).toBe("This is my bio.");
  });

  it("should handle setCity", () => {
    const initialState = { city: "" };
    const action = setCity("New York");
    const newState = profileReducer(initialState, action);

    // Positive Test 3 : Check if setCity correctly updates the city.
    expect(newState.city).toBe("New York");
  });

  it("should handle setEditMode", () => {
    const initialState = { editMode: false };
    const action = setEditMode(true);
    const newState = profileReducer(initialState, action);

    // Positive Test 4 : Check if setEditMode correctly updates the editMode.
    expect(newState.editMode).toBe(true);
  });

  it("should handle setUserData with an empty object", () => {
    const initialState = { userData: null };
    const action = setUserData({});
    const newState = profileReducer(initialState, action);

    // Positive Test 5 : Check if setUserData correctly updates the userData with an empty object.
    expect(newState.userData).toEqual({});
  });

  it("should handle setBio with an empty string", () => {
    const initialState = { bio: "" };
    const action = setBio("");
    const newState = profileReducer(initialState, action);

    // Positive Test 6 : Check if setBio correctly updates the bio with an empty string.
    expect(newState.bio).toBe("");
  });

  it("should handle setCity with an empty string", () => {
    const initialState = { city: "" };
    const action = setCity("");
    const newState = profileReducer(initialState, action);

    // Positive Test 7 : Check if setCity correctly updates the city with an empty string.
    expect(newState.city).toBe("");
  });

  it("should handle setEditMode with a false value", () => {
    const initialState = { editMode: true };
    const action = setEditMode(false);
    const newState = profileReducer(initialState, action);

    // Positive Test 8 : Check if setEditMode correctly updates the editMode with a false value.
    expect(newState.editMode).toBe(false);
  });

  it("should handle setUserData with null data", () => {
    const initialState = { userData: null };
    const action = setUserData(null);
    const newState = profileReducer(initialState, action);

    // Negative Test 1 : Check if setUserData with null data does not modify the state.
    expect(newState.userData).toBe(null);
  });

  it("should handle setBio with a very long bio", () => {
    const initialState = { bio: "" };
    const longBio = "a".repeat(1000); // A very long bio
    const action = setBio(longBio);
    const newState = profileReducer(initialState, action);
  
    // Negative Test 2: Check if setBio with a very long bio correctly limits the bio to 100 characters.
    expect(newState.bio).toBe(longBio.substring(0, 100));
  });
  

  it("should handle setCity with an invalid city", () => {
    const initialState = { city: "" };
    const invalidCity = 12345; // An invalid city value
    const action = setCity(invalidCity);
    const newState = profileReducer(initialState, action);

    // Negative Test 3 : Check if setCity with an invalid city does not modify the state.
    expect(newState.city).toBe("");
  });

  it("should handle setEditMode with a non-boolean value", () => {
    const initialState = { editMode: false };
    const nonBooleanValue = "true"; // A non-boolean value
    const action = setEditMode(nonBooleanValue);
    const newState = profileReducer(initialState, action);

    // Negative Test 4 : Check if setEditMode with a non-boolean value does not modify the state.
    expect(newState.editMode).toBe(false);
  });
});
