const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("userInfo") && localStorage.getItem("userInfo") !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    loading: false
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    updateUser(state, action) {
      const updatedUserData = {
        id: state.user.id,
        email: state.user.email,
        token: state.user.token,
        isAccountVerified: state.user.isAccountVerified,
        profilePhoto: action.payload.profilePhoto,
        username: action.payload.username,
        workshopName: action.payload.workshopName,
      };
      localStorage.setItem("userInfo", JSON.stringify(updatedUserData));
      state.user = updatedUserData;
    },
    verifyAccount(state, action) {
      let user = localStorage.getItem("userInfo") && localStorage.getItem("userInfo") !== "undefined" ? JSON.parse(localStorage.getItem('userInfo')) : null
      if (user) {
        user = action.payload
        localStorage.setItem("userInfo", JSON.stringify(user));
        state.user = JSON.parse(localStorage.getItem("userInfo"))
      }
    },
    updateToken(state, action) {
      let user = localStorage.getItem("userInfo") && localStorage.getItem("userInfo") !== "undefined" ? JSON.parse(localStorage.getItem('userInfo')) : null
      if (user) {
        user = { ...user, token: action.payload }
        localStorage.setItem("userInfo", JSON.stringify(user));
        state.user = JSON.parse(localStorage.getItem("userInfo"))
      }
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
  },
});

const authActions = authSlice.actions;
const authReducer = authSlice.reducer;

export { authActions, authReducer };
