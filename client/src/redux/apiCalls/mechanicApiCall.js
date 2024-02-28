import { toast } from "sonner";
import request from "../../utils/request";
import { mechanicActions } from "../slices/mechanicSlice";
import { authActions } from "../slices/authSlice";
import { searchActions } from "../slices/searchSlice";
import { ratingActions } from "../slices/ratingSlice";
import { refreshToken } from "./authApiCall";

// /api/mechanic/:id
export function fetchMechanic(id) {
  return async (dispatch) => {
    try {
      dispatch(mechanicActions.setLoading());
      const { data } = await request.get(`/api/mechanic/${id}`, {
        headers: {
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(mechanicActions.setMechanic(data));
      dispatch(mechanicActions.clearLoading());
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(mechanicActions.clearLoading());
    }
  };
}

// /api/mechanic/:id
export function updateMechanic(id, newData) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/mechanic/${id}`, newData, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(mechanicActions.setMechanic(data.data));
      dispatch(authActions.updateUser(data.data));
      toast.success(data.message);
    } catch (error) {
      if (error.response.status === 401) {
        await dispatch(refreshToken());
        await dispatch(updateMechanic(id, newData));
        return;
      } else {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };
}

// /api/mechanic/:id
export function deleteMechanic(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/mechanic/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(searchActions.deleteSearchResult(id));
      dispatch(ratingActions.deleteRatingsRelatedToWorkshop(id));
      toast.success(data.message);
    } catch (error) {
      if (error.response.status === 401) {
        await dispatch(refreshToken());
        await dispatch(deleteMechanic(id));
        return;
      } else {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };
}

// /api/mechanic/:id/photo
export function uploadWorkshopImg(id, workshopImg) {
  return async (dispatch, getState) => {
    try {
      dispatch(mechanicActions.setLoading());
      const { data } = await request.post(
        `/api/mechanic/${id}/photo`,
        workshopImg,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
            Cookie: document.cookie.i18next,
          },
          withCredentials: true,
        }
      );
      dispatch(mechanicActions.setMechanicPhoto(data.profilePhoto));
      dispatch(mechanicActions.clearLoading());
      toast.success(data.message);
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.profilePhoto = data?.profilePhoto;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      if (error.response.status === 401) {
        await dispatch(refreshToken());
        await dispatch(uploadWorkshopImg(id, workshopImg));
        return;
      } else {
        console.log(error);
        toast.error(error.response.data.message);
      }
    } finally {
      dispatch(mechanicActions.clearLoading());
    }
  };
}

// /api/mechanic/count
export function fetchWorkshopsCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/mechanic/count");
      dispatch(mechanicActions.setWorkshopsCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
