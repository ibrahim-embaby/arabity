import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/apiCalls/postApiCall";

function CreatePost() {
  const [post, setPost] = useState("");
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleCreatePost = (e) => {
    e.preventDefault();
    dispatch(createPost(post));
    setPost("");
  };
  return (
    <div className="create-post">
      <h3>إنشاء منشور</h3>
      <form onSubmit={handleCreatePost} className="create-post-form">
        <textarea
          onChange={(e) => setPost(e.target.value)}
          value={post}
          type="text"
          className="post-input-text"
        ></textarea>
        <button className="create-post-btn" type="submit">
          {t("create_post")}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
