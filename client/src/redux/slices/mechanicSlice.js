import { createSlice } from "@reduxjs/toolkit";

const mechanicSlice = createSlice({
  name: "mechanic",
  initialState: {
    mechanic: null,
    loading: false,
    workshopsCount: null,
  },
  reducers: {
    setMechanic(state, action) {
      state.mechanic = action.payload;
    },
    setMechanicPhoto(state, action) {
      state.mechanic.profilePhoto = action.payload;
    },
    addRatingToMechanic(state, action) {
      state.mechanic.mechanicRatings.push(action.payload);
    },
    clearRatingFromMechanic(state, action) {
      if (state.mechanic && state.mechanic.mechanicRatings) {
        state.mechanic.mechanicRatings = state.mechanic.mechanicRatings.filter(
          (rate) => rate._id !== action.payload
        );
      }
    },
    setWorkshopsCount(state, action) {
      state.workshopsCount = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
  },
});

const mechanicActions = mechanicSlice.actions;
const mechanicReducer = mechanicSlice.reducer;

export { mechanicActions, mechanicReducer };
