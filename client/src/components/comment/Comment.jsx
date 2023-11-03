import { useDispatch, useSelector } from "react-redux";
import "./comment.css";
import {
  deleteComment,
  updateComment,
} from "../../redux/apiCalls/commentApiCall";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Comment({ post, comment }) {
  const [openOptions, setOpenOptions] = useState(false);
  const [commentEdit, setCommentEdit] = useState(false);
  const [newComment, setNewComment] = useState(comment.text);
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const handleDeleteComment = () => {
    dispatch(deleteComment(post, comment._id));
  };
  const handleEditComment = (e) => {
    e.preventDefault();
    const commentData = {
      ...comment,
      text: newComment,
    };
    dispatch(updateComment(post, commentData));
    setCommentEdit(false);
  };
  return (
    <div className="comment">
      <div className="comment-header">
        <div className="comment-user-info">
          <Link
            className="comment-owner-photo-wrapper"
            to={
              comment.docModel === "Mechanic" &&
              `/mechanic/profile/${comment.doc._id}`
            }
          >
            <img
              className="comment-user-photo"
              src={comment.doc.profilePhoto.url}
              alt=""
            />
          </Link>
          <p>{comment.doc.username}</p>
        </div>
        {user?.id === comment.doc._id && (
          <div
            className="comment-options"
            onClick={() => setOpenOptions((prev) => !prev)}
          >
            <div className="comment-options-icon">...</div>
            {openOptions && (
              <ul className="comment-options-list">
                <li
                  onClick={() => setCommentEdit(true)}
                  className="comment-options-list-item"
                >
                  {t("comment_edit")}
                </li>
                <li
                  onClick={handleDeleteComment}
                  className="comment-options-list-item"
                >
                  {t("comment_delete")}
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="comment-body">
        {commentEdit ? (
          <form className="edit-comment-form" onSubmit={handleEditComment}>
            <input
              className="edit-comment-input"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button className="edit-comment-btn" type="submit">
              {t("comment_edit")}
            </button>
          </form>
        ) : (
          comment.text
        )}
      </div>
    </div>
  );
}

export default Comment;
