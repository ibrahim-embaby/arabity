import { toast } from "react-toastify";
import request from "../../utils/request";
import { profileActions } from "../slices/profileSlice";

// get user profile
export function getUserProfile(id) {
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
