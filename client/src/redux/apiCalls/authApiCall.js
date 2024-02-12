import { toast } from "react-toastify";
import request from "../../utils/request";
import { authActions } from "../slices/authSlice";
import { profileActions } from "../slices/profileSlice";
import { ratingActions } from "../slices/ratingSlice";
import { messageActions } from "../slices/messageSlice";

// register user
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

// login user
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

// fetch current user
export function fetchMe() {
  return async (dispatch, getState) => {
    try {
      dispatch(authActions.setLoading())
      const { data } = await request.get("/api/auth/me", {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(authActions.setUser(data));
      dispatch(authActions.clearLoading())
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(authActions.clearLoading())
    }
  };
}

// logout user
export function logoutUser() {
  return async (dispatch) => {
    dispatch(profileActions.clearProfile());
    dispatch(ratingActions.clearRatings());
    dispatch(messageActions.clearMessages());
    await request.get('/api/auth/signout', { withCredentials: true })
    dispatch(authActions.logout());
  };
}

// register Mechanic
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

// login Mechanic
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

// send verification mail
export function sendVerificationMail(email) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/send-verification-mail", {
        email
      }, {
        headers: {
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      toast.success(data.message)
    } catch (error) {
      if (error.response.status === 404) {
        await dispatch(logoutUser())
      }
      toast.error(error.response.data.message);
    }
  };
}

// verify email
export function verifyEmail(token) {
  return async (dispatch) => {
    try {
      dispatch(authActions.setLoading())
      const { data } = await request.post("/api/auth/verify-email", {
        token
      }, {
        headers: {
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(authActions.verifyAccount(data.data))
      dispatch(authActions.clearLoading())
      toast.success(data.message)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(authActions.clearLoading())
    }
  };
}

// forgot password
export function forgotPassword(email) {
  return async () => {
    try {
      const { data } = await request.post("/api/auth/forgot-password", {
        email
      }, {
        headers: {
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// reset password
export function resetPassword(token, password) {
  return async () => {
    try {
      const { data } = await request.post("/api/auth/reset-password", {
        token, password
      }, {
        headers: {
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// refresh token
export function refreshToken() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/auth/refresh-token", { withCredentials: true });
      dispatch(authActions.updateToken(data.token))
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 404) {
        await dispatch(logoutUser())
      }
      toast.error(error.response.data.message);
    }
  };
}