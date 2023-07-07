const { createSlice } = require("@reduxjs/toolkit");

const ratingSlice = createSlice({
  name: "rating",
  initialState: {},
  reducers: {},
});

const ratingActions = ratingSlice.actions;
const ratingReducer = ratingSlice.reducer;

export { ratingActions, ratingReducer };
