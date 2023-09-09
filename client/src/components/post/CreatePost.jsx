import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { createMechanicPost } from "../../redux/apiCalls/mechanicApiCall";

function CreatePost({ mechanicId }) {
  const [post, setPost] = useState("");
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleCreatePost = (e) => {
    e.preventDefault();
    dispatch(createMechanicPost(mechanicId, post));
  };
  return (
    <div className="create-post">
      <h3>إنشاء منشور</h3>
      <form onSubmit={handleCreatePost} className="create-post-form">
        <textarea
          onChange={(e) => setPost(e.target.value)}
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
