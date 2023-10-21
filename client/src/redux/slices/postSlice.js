const { createSlice } = require("@reduxjs/toolkit");

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    postLoading: false,
  },
  reducers: {
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
      const { _id: id, text } = action.payload;

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
    setPostLoading(state) {
      state.postLoading = true;
    },
    clearPostLoading(state) {
      state.postLoading = false;
    },
  },
});

const postActions = postSlice.actions;
const postReducer = postSlice.reducer;

export { postActions, postReducer };
