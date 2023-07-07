import { toast } from "react-toastify";
import request from "../../utils/request";
import { authActions } from "../slices/authSlice";

// register user
export function registerUser(user) {
  return async () => {
    try {
      const { data } = await request.post("/api/auth/register", user);
      toast.success(data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
}

// login user
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user);
      dispatch(authActions.setUser(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
      console.log(err);

      toast.error(err.response.data.message);
    }
  };
}

// logout user
export function logoutUser() {
  return async (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("userInfo");
  };
}

// register workshop owner
export function registerWorkshopOwner(user) {
  return async () => {
    try {
      const { data } = await request.post(
        "/api/auth/workshop-owner/register",
        user
      );
      toast.success(data.message);
    } catch (err) {
      console.log(user);
      toast.error(err.response.data.message);
    }
  };
}

// login workshop owner
export function loginWorkshopOwner(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(
        "/api/auth/workshop-owner/login",
        user
      );
      dispatch(authActions.setUser(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
}
