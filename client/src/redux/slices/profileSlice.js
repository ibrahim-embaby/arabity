import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
  },
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
  },
});

const profileActions = profileSlice.actions;
const profileReducer = profileSlice.reducer;

export { profileActions, profileReducer };
