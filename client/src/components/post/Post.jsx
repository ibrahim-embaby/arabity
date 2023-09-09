import { useState } from "react";
import formatTime from "../../utils/formatTime";
import "./post.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteMechanicPost,
  updateMechanicPost,
} from "../../redux/apiCalls/mechanicApiCall";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import CommentIcon from "@mui/icons-material/Comment";
import { useTranslation } from "react-i18next";

function Post({ post }) {
  const [openOptions, setOpenOptions] = useState(false);
  const [postEdit, setPostEdit] = useState(false);
  const [newPost, setNewPost] = useState(post.text);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleDeletePost = () => {
    dispatch(deleteMechanicPost(post.mechanicId._id, post._id));
  };
  const handleEditPost = (e) => {
    e.preventDefault();
    dispatch(updateMechanicPost(post.mechanicId._id, post._id, newPost));
    setPostEdit(false);
  };
  return (
    <div className="post">
      <div className="post-owner">
        <div className="post-owner-photo-wrapper">
          <Link to={`/mechanic/profile/${post.mechanicId._id}`}>
            <img
              className="post-owner-photo"
              src={post.mechanicId.workshopPhoto.url}
              alt=""
            />
          </Link>
        </div>
        <div className="post-owner-info">
          <div className="post-owner-username">{post.mechanicId.username}</div>
          <p className="post-date">{formatTime(post.createdAt)}</p>
        </div>
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
              <li onClick={handleDeletePost} className="post-options-list-item">
                {t("post_delete")}
              </li>
            </ul>
          )}
        </div>
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
        <div className="post-like">
          <ThumbUpOffAltIcon />
          <span>{t("post_like")}</span>
        </div>
        <div className="post-comment">
          <CommentIcon />
          <span>{t("post_comment")}</span>
        </div>
      </div>
    </div>
  );
}

export default Post;
