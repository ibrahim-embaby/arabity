import { useEffect } from "react";
import "./posts.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../redux/apiCalls/postApiCall";
import Post from "../../components/post/Post";
import { useTranslation } from "react-i18next";
import CreatePost from "../../components/post/CreatePost";

function Posts() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    dispatch(fetchAllPosts());
  }, []);
  return (
    <div className="posts">
      <div
        style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
        className="posts-container"
      >
        {user && (
          <div className="create-public-post">
            <CreatePost />
          </div>
        )}
        <p className="posts-title">{t("posts_title")}</p>
        {posts?.map((post) => (
          <>
            {post.privacy === "public" && (
              <>
                <Post key={post._id} post={post} />
                <br />
              </>
            )}
          </>
        ))}
      </div>
    </div>
  );
}

export default Posts;
