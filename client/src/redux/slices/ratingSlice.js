const { createSlice } = require("@reduxjs/toolkit");

const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    ratings: [],
    loading: false,
  },
  reducers: {
    setRatings(state, action) {
      state.ratings = action.payload;
    },
    clearRatings(state) {
      state.ratings = [];
    },
    deleteRating(state, action) {
      state.ratings = state.ratings.filter(
        (rating) => rating._id !== action.payload
      );
    },
    deleteRatingsRelatedToWorkshop(state, action) {
      state.ratings = state.ratings.filter(
        (rating) => rating.workshopOwner !== action.payload
      );
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
  },
});

const ratingActions = ratingSlice.actions;
const ratingReducer = ratingSlice.reducer;

export { ratingActions, ratingReducer };
