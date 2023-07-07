import { toast } from "react-toastify";
import request from "../../utils/request";

export function rateWorkshopOwner(rating, workshopOwner, text) {
  return async (dispatch, getState) => {
    try {
      await request.post(
        "api/rate",
        { rating, workshopOwner, text },
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      toast.success("تم التقييم بنجاح");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
}
