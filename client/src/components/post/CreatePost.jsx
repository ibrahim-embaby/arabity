import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { toast } from "sonner";

function CreatePost({ privacy }) {
  const [post, setPost] = useState("");
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!post) return toast.info(t("post_empty"));
    dispatch(createPost(post, privacy));
    setPost("");
  };
  return (
    <div className="create-post">
      <h3>{t("create_post_header")}</h3>
      <form onSubmit={handleCreatePost} className="create-post-form">
        <textarea
          onChange={(e) => setPost(e.target.value)}
          value={post}
          type="text"
          className="post-input-text"
        ></textarea>
        <div className="create-post-controllers">
          <button
            className={`create-post-btn`}
            disabled={!post ? true : false}
            type="submit"
          >
            {t("create_post")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
