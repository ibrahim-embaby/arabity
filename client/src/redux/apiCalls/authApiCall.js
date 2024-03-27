import { toast } from "sonner";
import request from "../../utils/request";
import { authActions } from "../slices/authSlice";
import { profileActions } from "../slices/profileSlice";
import { ratingActions } from "../slices/ratingSlice";
import { messageActions } from "../slices/messageSlice";

// /api/auth/register
export function registerUser(user) {
  return async () => {
    try {
      const { data } = await request.post("/api/auth/register", user, {
        headers: {
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// /api/auth/login
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user, {
        headers: {
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(authActions.setUser(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}

// /api/auth/me
export function fetchMe() {
  return async (dispatch, getState) => {
    try {
      dispatch(authActions.setLoading());
      const { data } = await request.get("/api/auth/me", {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(authActions.setUser(data));
      dispatch(authActions.clearLoading());
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(authActions.clearLoading());
    }
  };
}

// /api/auth/signout
export function logoutUser() {
  return async (dispatch) => {
    dispatch(profileActions.clearProfile());
    dispatch(ratingActions.clearRatings());
    dispatch(messageActions.clearMessages());
    await request.get("/api/auth/signout", { withCredentials: true });
    dispatch(authActions.logout());
  };
}

// /api/auth/mechanic/register
export function registerMechanic(user) {
  return async () => {
    try {
      const { data } = await request.post("/api/auth/mechanic/register", user, {
        headers: {
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}

// /api/auth/mechanic/login
export function loginMechanic(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/mechanic/login", user, {
        headers: {
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(authActions.setUser(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// /api/auth/send-verification-mail
export function sendVerificationMail(email) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(
        "/api/auth/send-verification-mail",
        {
          email,
        },
        {
          headers: {
            Cookie: document.cookie.i18next,
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
    } catch (error) {
      if (error.response.status === 404) {
        await dispatch(logoutUser());
      }
      toast.error(error.response.data.message);
    }
  };
}

// /api/auth/verify-email
export function verifyEmail(token) {
  return async (dispatch) => {
    try {
      dispatch(authActions.setLoading());
      const { data } = await request.post(
        "/api/auth/verify-email",
        {
          token,
        },
        {
          headers: {
            Cookie: document.cookie.i18next,
          },
          withCredentials: true,
        }
      );
      dispatch(authActions.verifyAccount(data.data));
      dispatch(authActions.clearLoading());
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(authActions.clearLoading());
    }
  };
}

// /api/auth/forgot-password
export function forgotPassword(email, userType) {
  return async () => {
    try {
      const { data } = await request.post(
        "/api/auth/forgot-password",
        {
          email,
          userType,
        },
        {
          headers: {
            Cookie: document.cookie.i18next,
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// /api/auth/reset-password
export function resetPassword(token, password) {
  return async () => {
    try {
      const { data } = await request.post(
        "/api/auth/reset-password",
        {
          token,
          password,
        },
        {
          headers: {
            Cookie: document.cookie.i18next,
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// /api/auth/refresh-token
export function refreshToken() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/auth/refresh-token", {
        withCredentials: true,
      });
      dispatch(authActions.updateToken(data.token));
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 404) {
        await dispatch(logoutUser());
      }
      toast.error(error.response.data.message);
    }
  };
}
