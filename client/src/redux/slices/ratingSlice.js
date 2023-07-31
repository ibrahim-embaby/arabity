const { createSlice } = require("@reduxjs/toolkit");

const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    ratings: [],
  },
  reducers: {
    setRatings(state, action) {
      state.ratings = action.payload;
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
  },
});

const ratingActions = ratingSlice.actions;
const ratingReducer = ratingSlice.reducer;

export { ratingActions, ratingReducer };
