import { toast } from "sonner";
import request from "../../utils/request";
import { postActions } from "../slices/postSlice";
import { refreshToken } from "./authApiCall";

// /api/posts/
export function createPost(text, privacy) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setPostLoading());
      const { data } = await request.post(
        "/api/posts",
        { text, privacy },
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
      if (error.response.status === 401) {
        await dispatch(refreshToken());
        await dispatch(createPost(text, privacy));
        return;
      } else {
        console.log(error);
        toast.error(error.response.data.message);
      }
    } finally {
      dispatch(postActions.clearPostLoading());
    }
  };
}

// /api/posts/
export function fetchAllPosts() {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setPostLoading());
      const { data } = await request.get(`/api/posts/`, {
        headers: {
          Cookie: document.i18next,
        },
        withCredentials: true,
      });
      const payload = data.map((post) => ({
        ...post,
        liked: post.likedBy.includes(getState().auth.user?.id),
      }));
      dispatch(postActions.setPosts(payload));
      dispatch(postActions.clearPostLoading());
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(postActions.clearPostLoading());
    }
  };
}

// /api/posts/user/:userId
export function fetchUserPosts(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setPostLoading());
      const { data } = await request.get(`/api/posts/user/${userId}`, {
        headers: {
          Cookie: document.i18next,
        },
        withCredentials: true,
      });
      const payload = data.map((post) => ({
        ...post,
        liked: post.likedBy.includes(getState().auth.user?.id),
      }));
      dispatch(postActions.setPosts(payload));
      dispatch(postActions.clearPostLoading());
    } catch (error) {
      if (error.response.status === 401) {
        await dispatch(refreshToken());
        await dispatch(fetchUserPosts(userId));
        return;
      } else {
        console.log(error);
        toast.error(error.response.data.message);
      }
    } finally {
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
      if (error.response.status === 401) {
        await dispatch(refreshToken());
        await dispatch(updatePost(postId, text));
        return;
      } else {
        console.log(error);
        toast.error(error.response.data.message);
      }
    } finally {
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
      if (error.response.status === 401) {
        await dispatch(refreshToken());
        await dispatch(deletePost(postId));
        return;
      } else {
        console.log(error);
        toast.error(error.response.data.message);
      }
    } finally {
      dispatch(postActions.clearPostLoading());
    }
  };
}

// /api/posts/:postId/like
export function likePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/posts/${postId}/like`, null, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          Cookie: document.i18next,
        },
        withCredentials: true,
      });
      dispatch(postActions.likePost(data.data));
    } catch (error) {
      if (error.response.status === 401) {
        await dispatch(refreshToken());
        await dispatch(likePost(postId));
        return;
      } else {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };
}

// /api/posts/:postId/like
export function unlikePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/posts/${postId}/unlike`, null, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          Cookie: document.i18next,
        },
        withCredentials: true,
      });
      dispatch(postActions.unlikePost(data.data));
    } catch (error) {
      if (error.response.status === 401) {
        await dispatch(refreshToken());
        await dispatch(unlikePost(postId));
        return;
      } else {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };
}
