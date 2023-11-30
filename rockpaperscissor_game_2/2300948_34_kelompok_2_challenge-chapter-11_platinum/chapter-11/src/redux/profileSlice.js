import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userData: null,
    bio: "",
    city: "",
    editMode: false,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setBio: (state, action) => {
      // Limit bio to a maximum of 100 characters
      state.bio = action.payload.substring(0, 100);
    },
    setCity: (state, action) => {
      if (typeof action.payload === "string") {
        state.city = action.payload;
      }
    },
    setEditMode: (state, action) => {
    if (typeof action.payload === 'boolean'){
      state.editMode = action.payload;
    }},
  },
});

export const { setUserData, setBio, setCity, setEditMode } =
  profileSlice.actions;

export default profileSlice.reducer;
