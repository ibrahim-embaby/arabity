import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { searchReducer } from "./slices/searchSlice";
import { ratingReducer } from "./slices/ratingSlice";
import { messageReducer } from "./slices/messageSlice";
import { conversationReducer } from "./slices/conversationSlice";
import { mechanicReducer } from "./slices/mechanicSlice";
import { postReducer } from "./slices/postSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    search: searchReducer,
    mechanic: mechanicReducer,
    rating: ratingReducer,
    message: messageReducer,
    conversation: conversationReducer,
    post: postReducer,
  },
});

export default store;
