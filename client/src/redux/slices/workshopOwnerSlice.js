import { createSlice } from "@reduxjs/toolkit";

const workshopOwnerSlice = createSlice({
  name: "workshopOwner",
  initialState: {
    workshopOwner: null,
    loading: false,
    workshopsCount: null,
  },
  reducers: {
    setWorkshopOwner(state, action) {
      state.workshopOwner = action.payload;
    },
    addRatingToWorkshopOwner(state, action) {
      state.workshopOwner.workshopRatings.push(action.payload);
    },
    clearRatingFromWorkshopOwner(state, action) {
      state.workshopOwner.workshopRatings =
        state.workshopOwner.workshopRatings.filter(
          (rate) => rate._id !== action.payload
        );
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

const workshopOwnerActions = workshopOwnerSlice.actions;
const workshopOwnerReducer = workshopOwnerSlice.reducer;

export { workshopOwnerActions, workshopOwnerReducer };
