import { toast } from "react-toastify";
import request from "../../utils/request";
import { mechanicActions } from "../slices/mechanicSlice";
import { ratingActions } from "../slices/ratingSlice";
import { refreshToken } from "./authApiCall";

const routeName = "ratings";

// rate a mechanic
export function rateMechanic(rating, mechanic, text) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `api/${routeName}`,
        { rating, mechanic, text },
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            Cookie: document.cookie.i18next,
          },
          withCredentials: true,
        }
      );
      dispatch(mechanicActions.addRatingToMechanic(data.rating));
      toast.success(data.message);
    } catch (error) {
      if (error.response.status === 401) {
        await dispatch(refreshToken())
        await dispatch(rateMechanic(rating, mechanic, text));
        return;

      } else {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };
}

// delete rating
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
      dispatch(ratingActions.deleteRating(data.ratingId));
      toast.success(data.message);
    } catch (error) {
      if (error.response.status === 401) {
        await dispatch(refreshToken())
        await dispatch(deleteRating(id));
        return;

      } else {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };
}

// fetch single user ratings
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
      if (error.response.status === 401) {
        await dispatch(refreshToken())
        await dispatch(fetchSingleUserRatings(userId));
        return;

      } else {
        console.log(error);
        toast.error(error.response.data.message);
      }
    } finally {
      dispatch(ratingActions.clearLoading());

    }
  };
}

// fetch all mechanic ratings
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
      if (error.response.status === 401) {
        await dispatch(refreshToken())
        await dispatch(fetchAllRatings());
        return;

      } else {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };
}
