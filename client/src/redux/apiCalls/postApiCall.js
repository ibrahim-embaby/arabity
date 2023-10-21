import { toast } from "react-toastify";
import request from "../../utils/request";
import { postActions } from "../slices/postSlice";

// /api/posts/
export function createPost(text) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setPostLoading());
      const { data } = await request.post(
        "/api/posts",
        { text },
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            Cookie: document.cookie.i18next,
          },
          withCredentials: true,
        }
      );
      dispatch(postActions.addPostToPosts(data.data));
      dispatch(postActions.clearPostLoading());
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(postActions.clearPostLoading());
    }
  };
}

// /api/posts/user/:userId
export function fetchUserPosts(userId) {
  return async (dispatch) => {
    try {
      dispatch(postActions.setPostLoading());
      const { data } = await request.get(`/api/posts/user/${userId}`, {
        headers: {
          Cookie: document.i18next,
        },
        withCredentials: true,
      });
      dispatch(postActions.setPosts(data));
      dispatch(postActions.clearPostLoading());
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(postActions.clearPostLoading());
    }
  };
}

// /api/posts/:postId
export function updatePost(postId, text) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setPostLoading());
      const { data } = await request.put(
        `/api/posts/${postId}`,
        { text },
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            Cookie: document.i18next,
          },
          withCredentials: true,
        }
      );
      dispatch(postActions.updatePost(data.data));
      dispatch(postActions.clearPostLoading());
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(postActions.clearPostLoading());
    }
  };
}

// /api/posts/:postId
export function deletePost(postId) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setPostLoading());
      const { data } = await request.delete(`/api/posts/${postId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          Cookie: document.i18next,
        },
        withCredentials: true,
      });
      dispatch(postActions.removePostFromPosts(data.data._id));
      dispatch(postActions.clearPostLoading());
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(postActions.clearPostLoading());
    }
  };
}
