import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    users: [],
  },
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    clearUser(state, action) {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
  },
});

const profileActions = profileSlice.actions;
const profileReducer = profileSlice.reducer;

export { profileActions, profileReducer };
