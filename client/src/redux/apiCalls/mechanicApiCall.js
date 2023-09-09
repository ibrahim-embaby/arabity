import { toast } from "react-toastify";
import request from "../../utils/request";
import { mechanicActions } from "../slices/mechanicSlice";
import { searchActions } from "../slices/searchSlice";
import { ratingActions } from "../slices/ratingSlice";

// /api/mechanic/:id
export function fetchMechanic(id) {
  return async (dispatch) => {
    try {
      dispatch(mechanicActions.setLoading());
      const { data } = await request.get(`/api/mechanic/${id}`, {
        headers: {
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });

      dispatch(mechanicActions.setMechanic(data));
      dispatch(mechanicActions.clearLoading());
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
      dispatch(mechanicActions.clearLoading());
    }
  };
}

// /api/mechanic/:id
export function deleteMechanic(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/mechanic/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(searchActions.deleteSearchResult(id));
      dispatch(ratingActions.deleteRatingsRelatedToWorkshop(id));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// /api/mechanic/:id/photo
export function uploadWorkshopImg(id, workshopImg) {
  return async (dispatch, getState) => {
    try {
      dispatch(mechanicActions.setLoading());
      const { data } = await request.post(
        `/api/mechanic/${id}/photo`,
        workshopImg,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
            Cookie: document.cookie.i18next,
          },
          withCredentials: true,
        }
      );
      dispatch(mechanicActions.setMechanicPhoto(data.workshopPhoto));
      dispatch(mechanicActions.clearLoading());
      toast.success(data.message);
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.profilePhoto = data?.workshopPhoto;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      dispatch(mechanicActions.clearLoading());
      toast.error(error.response.data.message);
    }
  };
}

// /api/mechanic/count
export function fetchWorkshopsCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/mechanic/count");
      dispatch(mechanicActions.setWorkshopsCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// /api/mechanic/:mechanicId/posts
export function createMechanicPost(mechanicId, post) {
  return async (dispatch, getState) => {
    try {
      dispatch(mechanicActions.setPostLoading());
      const { data } = await request.post(
        `/api/mechanic/${mechanicId}/posts`,
        { text: post },
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            Cookie: document.i18next,
          },
          withCredentials: true,
        }
      );
      dispatch(mechanicActions.addPostToPosts(data.data));
      dispatch(mechanicActions.clearPostLoading());
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(mechanicActions.clearPostLoading());
    }
  };
}

// /api/mechanic/:mechanicId/posts
export function fetchMechanicPosts(mechanicId) {
  return async (dispatch) => {
    try {
      dispatch(mechanicActions.setPostLoading());
      const { data } = await request.get(`/api/mechanic/${mechanicId}/posts`, {
        headers: {
          Cookie: document.i18next,
        },
        withCredentials: true,
      });
      dispatch(mechanicActions.setPosts(data));
      dispatch(mechanicActions.clearPostLoading());
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(mechanicActions.clearPostLoading());
    }
  };
}

// /api/mechanic/:mechanicId/posts/:postId
export function updateMechanicPost(mechanicId, postId, text) {
  return async (dispatch, getState) => {
    try {
      dispatch(mechanicActions.setPostLoading());
      const { data } = await request.put(
        `/api/mechanic/${mechanicId}/posts/${postId}`,
        { text },
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            Cookie: document.i18next,
          },
          withCredentials: true,
        }
      );
      dispatch(mechanicActions.updatePost(data.data));
      dispatch(mechanicActions.clearPostLoading());
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(mechanicActions.clearPostLoading());
    }
  };
}

// /api/mechanic/:mechanicId/posts/:postId
export function deleteMechanicPost(mechanicId, postId) {
  return async (dispatch, getState) => {
    try {
      dispatch(mechanicActions.setPostLoading());
      const { data } = await request.delete(
        `/api/mechanic/${mechanicId}/posts/${postId}`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            Cookie: document.i18next,
          },
          withCredentials: true,
        }
      );
      dispatch(mechanicActions.removePostFromPosts(data.data._id));
      dispatch(mechanicActions.clearPostLoading());
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(mechanicActions.clearPostLoading());
    }
  };
}
