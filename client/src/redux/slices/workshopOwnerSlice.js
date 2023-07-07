import { createSlice } from "@reduxjs/toolkit";

const workshopOwnerSlice = createSlice({
  name: "workshopOwner",
  initialState: {
    workshopOwner: null,
    loading: false,
  },
  reducers: {
    setWorkshopOwner(state, action) {
      state.workshopOwner = action.payload;
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
