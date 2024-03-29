import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/apiCalls/commentApiCall";

function CreateComment({ post }) {
  const [comment, setComment] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleCreateComment = (e) => {
    e.preventDefault();
    if (!comment) return toast.info(t("comment_empty"));
    const commentData = {
      doc: {
        username: user.username,
        _id: user.id,
        profilePhoto: user.profilePhoto,
      },
      text: comment,
      postId: post._id,
    };
    if (user.workshopName) {
      commentData.doc.workshopName = user.workshopName;
    }
    dispatch(createComment(post, commentData));
    setComment("");
  };
  return (
    <div className="create-comment">
      <form onSubmit={handleCreateComment} className="create-comment-form">
        <input
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          type="text"
          className="comment-input-text"
        />
        <button
          className={`create-comment-btn`}
          disabled={comment ? false : true}
          type="submit"
        >
          {t("create_comment")}
        </button>
      </form>
    </div>
  );
}

/**
 * for creating mentions
 * 
 * <MentionsInput
          value={comment}
          style={MentionStyle}
          onChange={(e) => setComment(e.target.value)}
          className="comment-input-text"
        >
          <Mention style={{ backgroundColor: "#ccc" }} data={postUsers} />
        </MentionsInput>
 */

export default CreateComment;
