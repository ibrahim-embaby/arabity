import { toast } from "react-toastify";
import request from "../../utils/request";
import { searchActions } from "../slices/searchSlice";

export function fetchWorkshops(
  car = "",
  service = "",
  province = "",
  page = null
) {
  return async (dispatch) => {
    try {
      dispatch(searchActions.setLoading());
      const { data } = await request.get(
        `/api/search/workshop?car=${car}&service=${service}&province=${province}&page=${page}`
      );
      dispatch(searchActions.setSearchResults(data.workshops));
      dispatch(searchActions.setSearchResultsCount(data.count));
      dispatch(searchActions.clearLoading());
    } catch (err) {
      toast.error(err.response.data.message);
      dispatch(searchActions.setLoading());
    }
  };
}
