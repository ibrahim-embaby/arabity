import { useState } from "react";
import formatTime from "../../utils/formatTime";
import "./post.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import { useTranslation } from "react-i18next";
import {
  deletePost,
  likePost,
  unlikePost,
  updatePost,
} from "../../redux/apiCalls/postApiCall";
import { toast } from "react-toastify";
import Comment from "../comment/Comment";
import CreateComment from "../comment/CreateComment";

function Post({ post }) {
  const [openOptions, setOpenOptions] = useState(false);
  const [postEdit, setPostEdit] = useState(false);
  const [newPost, setNewPost] = useState(post.text);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleDeletePost = () => {
    dispatch(deletePost(post._id));
  };
  const handleEditPost = (e) => {
    e.preventDefault();
    dispatch(updatePost(post._id, newPost));
    setPostEdit(false);
  };
  const handleToggleLike = () => {
    if (!user) {
      return toast.info(t("login_required"));
    }
    if (post.liked) {
      dispatch(unlikePost(post._id));
    } else {
      dispatch(likePost(post._id));
    }
  };
  return (
    <div className="post">
      <div className="post-owner">
        <div className="post-owner-photo-wrapper">
          <Link to={`/mechanic/profile/${post.doc._id}`}>
            <img
              className="post-owner-photo"
              src={post.doc.profilePhoto.url}
              alt=""
            />
          </Link>
        </div>
        <div className="post-owner-info">
          <h4 className="post-owner-username">{post.doc.username}</h4>
          <p className="post-date">{formatTime(post.createdAt)}</p>
        </div>
        {user?.id === post.doc._id && (
          <div
            className="post-options"
            onClick={() => setOpenOptions((prev) => !prev)}
          >
            <div className="post-options-icon">...</div>
            {openOptions && (
              <ul className="post-options-list">
                <li
                  onClick={() => setPostEdit(true)}
                  className="post-options-list-item"
                >
                  {t("post_edit")}
                </li>
                <li
                  onClick={handleDeletePost}
                  className="post-options-list-item"
                >
                  {t("post_delete")}
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
      <div className="post-text">
        {postEdit ? (
          <form className="edit-post-form" onSubmit={handleEditPost}>
            <input
              className="edit-post-input"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <button className="edit-post-btn" type="submit">
              {t("post_edit")}
            </button>
          </form>
        ) : (
          post.text
        )}
      </div>
      <hr />
      <div className="post-controls">
        <div className="post-like" onClick={handleToggleLike}>
          {post.liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
          <span>{t("post_like")}</span>
          {post.likes}
        </div>
        <div className="post-comment">
          <CommentIcon />
          <span>{t("post_comment")}</span>
        </div>
      </div>
      <div className="post-comments-wrapper">
        <div className="post-comments">
          {post.comments?.map((comment, index) => (
            <Comment key={index} comment={comment} post={post} />
          ))}
        </div>
        {user && <CreateComment post={post} />}
      </div>
    </div>
  );
}

export default Post;
