const { createSlice } = require("@reduxjs/toolkit");

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: [],
    otherUser: null,
  },
  reducers: {
    setConversations(state, action) {
      state.conversations = action.payload;
    },
    setOtherUser(state, action) {
      state.otherUser = action.payload;
    },
  },
});

const conversationActions = conversationSlice.actions;
const conversationReducer = conversationSlice.reducer;

export { conversationActions, conversationReducer };
