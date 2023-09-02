import { toast } from "react-toastify";
import request from "../../utils/request";
import { authActions } from "../slices/authSlice";
import { profileActions } from "../slices/profileSlice";
import { ratingActions } from "../slices/ratingSlice";
import { messageActions } from "../slices/messageSlice";

// register user
export function registerUser(user) {
  return async () => {
    try {
      const { data } = await request.post("/api/auth/register", user, {
        headers: {
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      toast.success(data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
}

// login user
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user, {
        headers: {
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(authActions.setUser(data));
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
}

// logout user
export function logoutUser() {
  return async (dispatch) => {
    dispatch(profileActions.clearProfile());
    dispatch(ratingActions.clearRatings());
    dispatch(messageActions.clearMessages());
    dispatch(authActions.logout());
  };
}

// register Mechanic
export function registerMechanic(user) {
  return async () => {
    try {
      const { data } = await request.post("/api/auth/mechanic/register", user, {
        headers: {
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      toast.success(data.message);
    } catch (err) {
      console.log(user);
      toast.error(err.response.data.message);
    }
  };
}

// login Mechanic
export function loginMechanic(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/mechanic/login", user, {
        headers: {
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(authActions.setUser(data));
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
}
