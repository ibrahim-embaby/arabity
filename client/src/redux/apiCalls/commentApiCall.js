import { toast } from "sonner";
import { postActions } from "../slices/postSlice";
import request from "../../utils/request";
import { refreshToken } from "./authApiCall";

// /api/comments/
export function createComment(post, comment) {
  return async (dispatch, getState) => {
    const newPost = { ...post, comments: [...post.comments, comment] };
    dispatch(postActions.updatePost(newPost));
    try {
      const { data } = await request.post(
        "/api/comments",
        { text: comment.text, postId: comment.postId },
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            Cookie: document.cookie.i18next,
          },
          withCredentials: true,
        }
      );
      const newPost = { ...post, comments: [...post.comments, data] };
      dispatch(postActions.updatePost(newPost));
    } catch (error) {
      if (error.response.status === 401) {
        await dispatch(refreshToken());
        await dispatch(createComment(post, comment));
        return;
      } else {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };
}

// /api/comments/:id
export function updateComment(post, comment) {
  return async (dispatch, getState) => {
    const newPost = {
      ...post,
      comments: [
        ...post.comments.filter((cm) => cm._id !== comment._id),
        comment,
      ],
    };
    dispatch(postActions.updatePost(newPost));
    try {
      const { data } = await request.put(
        `/api/comments/${comment._id}`,
        { text: comment.text },
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            Cookie: document.cookie.i18next,
          },
          withCredentials: true,
        }
      );
      const newPost = {
        ...post,
        comments: [
          ...post.comments.filter((cm) => cm._id !== comment._id),
          data,
        ],
      };
      dispatch(postActions.updatePost(newPost));
    } catch (error) {
      if (error.response.status === 401) {
        await dispatch(refreshToken());
        await dispatch(updateComment(post, comment));
        return;
      } else {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };
}

// /api/comments/:id
export function deleteComment(post, commentId) {
  return async (dispatch, getState) => {
    const newPost = {
      ...post,
      comments: post.comments.filter((c) => c._id !== commentId),
    };
    dispatch(postActions.updatePost(newPost));
    try {
      const { data } = await request.delete(`/api/comments/${commentId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      toast.success(data.message);
    } catch (error) {
      if (error.response.status === 401) {
        await dispatch(refreshToken());
        await dispatch(deleteComment(post, commentId));
        return;
      } else {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };
}
