const { createSlice } = require("@reduxjs/toolkit");

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
    clearMessages(state) {
      state.messages = [];
    },
    addMessageToMessages(state, action) {
      state.messages.push(action.payload);
    },
  },
});

const messageActions = messageSlice.actions;
const messageReducer = messageSlice.reducer;

export { messageActions, messageReducer };
