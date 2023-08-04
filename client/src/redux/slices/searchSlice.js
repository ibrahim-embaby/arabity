import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResults: [],
    searchResultsCount: null,
    loading: false,
  },
  reducers: {
    setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
    deleteSearchResult(state, action) {
      state.searchResults = state.searchResults.filter(
        (res) => res.id !== action.payload
      );
    },
    setSearchResultsCount(state, action) {
      state.searchResultsCount = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
  },
});

const searchReducer = searchSlice.reducer;
const searchActions = searchSlice.actions;

export { searchActions, searchReducer };
