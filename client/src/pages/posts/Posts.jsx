import { useEffect } from "react";
import "./posts.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../redux/apiCalls/postApiCall";
import Post from "../../components/post/Post";
import { useTranslation } from "react-i18next";

function Posts() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const { i18n } = useTranslation();
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
        {posts?.map((post) => (
          <>
            <Post key={post._id} post={post} />
            <br />
          </>
        ))}
      </div>
    </div>
  );
}

export default Posts;
