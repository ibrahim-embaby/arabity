import { toast } from "react-toastify";
import request from "../../utils/request";
import { searchActions } from "../slices/searchSlice";

export function fetchAllWorkshops(car = "", service = "", province = "") {
  return async (dispatch) => {
    try {
      dispatch(searchActions.setLoading());

      const { data } = await request.get(
        `/api/search/workshop?car=${car}&service=${service}&province=${province}`
      );
      dispatch(searchActions.setSearchResults(data));
      dispatch(searchActions.clearLoading());
    } catch (err) {
      toast.error(err.response.data.message);
      dispatch(searchActions.setLoading());
    }
  };
}
