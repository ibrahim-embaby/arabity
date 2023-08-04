import { toast } from "react-toastify";
import request from "../../utils/request";
import { workshopOwnerActions } from "../slices/workshopOwnerSlice";
import { searchActions } from "../slices/searchSlice";
import { ratingActions } from "../slices/ratingSlice";

// /api/workshop-owner/:id
export function fetchWorkshopOwner(id) {
  return async (dispatch) => {
    try {
      dispatch(workshopOwnerActions.setLoading());
      const { data } = await request.get(`/api/workshop-owner/${id}`);

      dispatch(workshopOwnerActions.setWorkshopOwner(data));
      dispatch(workshopOwnerActions.clearLoading());
    } catch (err) {
      toast.error(err.response.data.message);
      dispatch(workshopOwnerActions.setLoading());
    }
  };
}

// /api/workshop-owner/:id
export function deleteWorkshop(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/workshop-owner/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(searchActions.deleteSearchResult(id));
      dispatch(ratingActions.deleteRatingsRelatedToWorkshop(id));
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
}

// /api/workshop-owner/count
export function fetchWorkshopsCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/workshop-owner/count");
      dispatch(workshopOwnerActions.setWorkshopsCount(data));
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
}
