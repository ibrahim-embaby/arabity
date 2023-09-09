import { createSlice } from "@reduxjs/toolkit";

const mechanicSlice = createSlice({
  name: "mechanic",
  initialState: {
    mechanic: null,
    loading: false,
    workshopsCount: null,
    posts: [],
    postLoading: false,
  },
  reducers: {
    setMechanic(state, action) {
      state.mechanic = action.payload;
    },
    setMechanicPhoto(state, action) {
      state.mechanic.workshopPhoto = action.payload;
    },
    addRatingToMechanic(state, action) {
      state.mechanic.mechanicRatings.push(action.payload);
    },
    clearRatingFromMechanic(state, action) {
      state.mechanic.mechanicRatings = state.mechanic.mechanicRatings.filter(
        (rate) => rate._id !== action.payload
      );
    },
    setWorkshopsCount(state, action) {
      state.workshopsCount = action.payload;
    },
    setPosts(state, action) {
      state.posts = action.payload;
    },
    clearPosts(state) {
      state.posts = [];
    },
    addPostToPosts(state, action) {
      state.posts.unshift(action.payload);
    },
    removePostFromPosts(state, action) {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    updatePost(state, action) {
      const { id, text } = action.payload;

      state.posts = state.posts.map((post) => {
        if (post._id === id) {
          return {
            ...post,
            text: text,
          };
        }

        return post;
      });
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },

    setPostLoading(state) {
      state.postLoading = true;
    },
    clearPostLoading(state) {
      state.postLoading = false;
    },
  },
});

const mechanicActions = mechanicSlice.actions;
const mechanicReducer = mechanicSlice.reducer;

export { mechanicActions, mechanicReducer };
