import { toast } from "react-toastify";
import request from "../../utils/request";
import { workshopOwnerActions } from "../slices/workshopOwnerSlice";

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
