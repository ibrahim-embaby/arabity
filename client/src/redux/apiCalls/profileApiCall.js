import { toast } from "react-toastify";
import request from "../../utils/request";
import { profileActions } from "../slices/profileSlice";

// get user profile
export function fetchUserProfile(id) {
  return async (dispatch, getState) => {
    const { data } = await request.get(`/api/user/profile/${id}`, {
      headers: {
        Authorization: "Bearer " + getState().auth.user.token,
      },
    });
    dispatch(profileActions.setProfile(data));
    try {
    } catch (err) {
      toast.error(err.response.data.message);
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
        },
      });
      dispatch(profileActions.setUsers(data));
    } catch (err) {
      toast.error(err.response.data.message);
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
        },
      });

      dispatch(profileActions.clearUser(id));
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
}
