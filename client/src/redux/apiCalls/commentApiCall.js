import { toast } from "react-toastify";
import { postActions } from "../slices/postSlice";
import request from "../../utils/request";

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
      toast.error(error.response.data.message);
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
      toast.error(error.response.data.message);
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
      toast.error(error.response.data.message);
    }
  };
}
