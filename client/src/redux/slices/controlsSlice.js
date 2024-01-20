const { createSlice } = require("@reduxjs/toolkit");

const controlsSlice = createSlice({
  name: "controls",
  initialState: {
    services: [],
    cars: [],
    provinces: [],
    loading: false,
  },
  reducers: {
    setServices(state, action) {
      state.services = action.payload;
    },
    setCars(state, action) {
      state.cars = action.payload;
    },
    setProvinces(state, action) {
      state.provinces = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
  },
});

const controlsActions = controlsSlice.actions;
const controlsReducer = controlsSlice.reducer;

export { controlsActions, controlsReducer };
