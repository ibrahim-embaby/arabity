import { Fragment, useEffect } from "react";
import "./posts.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../redux/apiCalls/postApiCall";
import Post from "../../components/post/Post";
import { useTranslation } from "react-i18next";
import CreatePost from "../../components/post/CreatePost";
import { Helmet } from "react-helmet-async";
import { Loading } from "../../components/loading/Loading";

function Posts() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { posts, postLoading } = useSelector((state) => state.post);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    dispatch(fetchAllPosts());
  }, []);
  return (
    <div className="posts">
      <Helmet>
        <title>{t("posts_page_title")}</title>
        <meta
          name="description"
          content="Arabity - Posts Page, here you can reach other users/mechanics posts"
        />
      </Helmet>
      <div
        style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
        className="posts-container"
      >
        {user && (
          <div className="create-public-post">
            <CreatePost privacy={"public"} />
          </div>
        )}
        <p className="posts-title">{t("posts_title")}</p>

        {postLoading ? (
          <Loading
            style={{
              height: "0",
              minHeight: "0",
            }}
          />
        ) : (
          posts?.map((post) => (
            <Fragment key={post._id}>
              {post.privacy === "public" && (
                <>
                  <Post post={post} />
                  <br />
                </>
              )}
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
}

export default Posts;
