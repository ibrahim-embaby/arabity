import { toast } from "react-toastify";
import request from "../../utils/request";
import { workshopOwnerActions } from "../slices/workshopOwnerSlice";
import { ratingActions } from "../slices/ratingSlice";

const routeName = "ratings";

export function rateWorkshopOwner(rating, workshopOwner, text) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `api/${routeName}`,
        { rating, workshopOwner, text },
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            Cookie: document.cookie.i18next,
          },
          withCredentials: true,
        }
      );
      dispatch(workshopOwnerActions.addRatingToWorkshopOwner(data.rating));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function deleteRating(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`api/${routeName}/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(
        workshopOwnerActions.clearRatingFromWorkshopOwner(data.ratingId)
      );
      dispatch(ratingActions.deleteRating(data.ratingId));
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
}

export function fetchSingleUserRatings(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(ratingActions.setLoading());

      const { data } = await request.get(`api/${routeName}/${userId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(ratingActions.setRatings(data));
      dispatch(ratingActions.clearLoading());
    } catch (error) {
      dispatch(ratingActions.clearLoading());
      toast.error(error.response.data.message);
    }
  };
}

export function fetchAllRatings() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/${routeName}/`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(ratingActions.setRatings(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
