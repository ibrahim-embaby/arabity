import { useEffect } from "react";
import "./posts.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../redux/apiCalls/postApiCall";
import Post from "../../components/post/Post";

function Posts() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);
  return (
    <div className="posts">
      <div className="container">
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
