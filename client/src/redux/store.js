import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { searchReducer } from "./slices/searchSlice";
import { workshopOwnerReducer } from "./slices/workshopOwnerSlice";
import { ratingReducer } from "./slices/ratingSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    search: searchReducer,
    workshopOwner: workshopOwnerReducer,
    rating: ratingReducer,
  },
});

export default store;
