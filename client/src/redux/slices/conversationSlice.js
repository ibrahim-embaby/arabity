const { createSlice } = require("@reduxjs/toolkit");

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: [],
    otherUser: null,
    loading: false,
  },
  reducers: {
    setConversations(state, action) {
      state.conversations = action.payload;
    },
    setOtherUser(state, action) {
      state.otherUser = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
  },
});

const conversationActions = conversationSlice.actions;
const conversationReducer = conversationSlice.reducer;

export { conversationActions, conversationReducer };
