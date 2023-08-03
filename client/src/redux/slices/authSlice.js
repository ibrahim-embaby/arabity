const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
    },
  },
});

const authActions = authSlice.actions;
const authReducer = authSlice.reducer;

export { authActions, authReducer };
