import request from "../../utils/request";
import { controlsActions } from "../slices/controlsSlice";
import { toast } from "react-toastify";

export function fetchControls() {
  return async (dispatch) => {
    try {
      dispatch(controlsActions.setLoading());

      // fetch services
      const { data: services } = await request.get("/api/controls/services", {
        headers: {
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(controlsActions.setServices(services));

      // fetch cars
      const { data: cars } = await request.get("/api/controls/cars", {
        headers: {
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(controlsActions.setCars(cars));

      // fetch provinces
      const { data: provinces } = await request.get("/api/controls/provinces", {
        headers: {
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(controlsActions.setProvinces(provinces));

      dispatch(controlsActions.clearLoading());
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(controlsActions.clearLoading());
    }
  };
}

// /api/controls/services
export function fetchServices() {
  return async (dispatch) => {
    try {
      dispatch(controlsActions.setLoading());
      const { data } = await request.get("/api/controls/services", {
        headers: {
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(controlsActions.setServices(data));
      dispatch(controlsActions.clearLoading());
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(controlsActions.clearLoading());
    }
  };
}

// /api/controls/cars
export function fetchCars() {
  return async (dispatch) => {
    try {
      dispatch(controlsActions.setLoading());
      const { data } = await request.get("/api/controls/cars", {
        headers: {
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(controlsActions.setCars(data));
      dispatch(controlsActions.clearLoading());
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(controlsActions.clearLoading());
    }
  };
}

// /api/controls/provinces
export function fetchProvinces() {
  return async (dispatch) => {
    try {
      dispatch(controlsActions.setLoading());
      const { data } = await request.get("/api/controls/provinces", {
        headers: {
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(controlsActions.setProvinces(data));
      dispatch(controlsActions.clearLoading());
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(controlsActions.clearLoading());
    }
  };
}
