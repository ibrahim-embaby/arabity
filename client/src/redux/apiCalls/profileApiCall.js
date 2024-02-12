import { toast } from "react-toastify";
import request from "../../utils/request";
import { profileActions } from "../slices/profileSlice";
import { authActions } from "../slices/authSlice";
import { refreshToken } from "./authApiCall";

// get user profile
export function fetchUserProfile(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/user/profile/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(profileActions.setProfile(data));
    } catch (error) {
      if (error.response.status === 401) {
        await dispatch(refreshToken())
        await dispatch(fetchUserProfile(id));
        return;

      } else {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };
}

// fetch all users
export function fetchAllUsers() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get("api/user/", {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(profileActions.setUsers(data));
    } catch (error) {
      if (error.response.status === 401) {
        await dispatch(refreshToken())
        await dispatch(fetchAllUsers());
        return;

      } else {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };
}

// delete single user
export function deleteUser(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/user/profile/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });

      dispatch(profileActions.clearUser(id));
      toast.success(data.message);
    } catch (error) {
      if (error.response.status === 401) {
        await dispatch(refreshToken())
        await dispatch(deleteUser(id));
        return;

      } else {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };
}

// update user profile
export function updateUserProfile(userInfo) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put("/api/user/profile/", userInfo, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(profileActions.setProfile(data.data));
      dispatch(authActions.setUser(data.data));
      toast.success(data.message);
    } catch (error) {
      if (error.response.status === 401) {
        await dispatch(refreshToken())
        await dispatch(updateUserProfile(userInfo));
        return;

      } else {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };
}
