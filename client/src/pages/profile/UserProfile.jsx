import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/apiCalls/profileApiCall";
import { Link, useParams } from "react-router-dom";
import "./profile.css";
import {
  deleteRating,
  fetchSingleUserRatings,
} from "../../redux/apiCalls/ratingApiCall";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchUserPosts } from "../../redux/apiCalls/postApiCall";
import Post from "../../components/post/Post";
import { Helmet } from "react-helmet-async";
import SwitchBar from "../../components/switch-bar/SwitchBar";

function Profile() {
  const { t, i18n } = useTranslation();
  const sidebarItems = [
    {
      title: t("profile_ratings"),
      value: 1,
    },
    {
      title: t("posts_title"),
      value: 2,
    },
  ];
  const dispatch = useDispatch();
  const [currentComponent, setCurrentComponent] = useState(
    sidebarItems[0].value
  );

  const { user } = useSelector((state) => state.auth);
  const { ratings, loading } = useSelector((state) => state.rating);
  const { posts, postLoading } = useSelector((state) => state.post);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchUserProfile(id));
    dispatch(fetchSingleUserRatings(id));
    dispatch(fetchUserPosts(id));
  }, [id]);

  const handleDeleteRating = (ratingId) => {
    dispatch(deleteRating(ratingId));
  };
  return (
    <div
      className="profile"
      style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
    >
      <Helmet>
        <title>{t("user_profile_page_title")}</title>
        <meta
          name="description"
          content="Arabity - User Page, this is your profile page, you can find your posts and ratings"
        />
      </Helmet>
      <div className="profile-sidebar">
        <div className="sidebar-account-info">
          <p className="sidebar-account-username">{user.username}</p>
          <p className="sidebar-account-email">{user.email}</p>
        </div>
        <hr />
        <div className="profile-sidebar-items">
          {sidebarItems.map((item) => (
            <p
              className="profile-sidebar-item"
              key={item.value}
              onClick={() => setCurrentComponent(item.value)}
              style={{
                backgroundColor: item.value === currentComponent && "#ffd1d1da",
              }}
            >
              {item.title}
            </p>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="profile-data">
          <div className="profile-data-account-info">
            <p className="sidebar-account-username">{user.username}</p>
            <p className="sidebar-account-email">{user.email}</p>
          </div>

          <div className="profile-data-switchbar">
            <SwitchBar
              options={sidebarItems}
              visibleOption={currentComponent}
              setVisibleOption={setCurrentComponent}
            />
          </div>
          {currentComponent === 1 ? (
            <div className="user-ratings-wrapper">
              <h2>{t("profile_ratings")}</h2>
              <div className="profile-user-ratings">
                {loading ? (
                  <p>{t("loading")}</p>
                ) : ratings.length ? (
                  ratings.map((rating) => (
                    <div className="user-rating" key={rating._id}>
                      <Link to={`/mechanic/profile/${rating.mechanic._id}`}>
                        <p>{rating.mechanic.workshopName}</p>
                        <p>{rating.rating} / 5</p>
                        <p>{rating.text}</p>
                      </Link>
                      <button
                        className="delete-rating-btn"
                        onClick={() => handleDeleteRating(rating._id)}
                      >
                        <span> {t("delete_btn")}</span>
                        <DeleteIcon />
                      </button>
                    </div>
                  ))
                ) : (
                  <p>{t("no_workshop_ratings")}</p>
                )}
              </div>
            </div>
          ) : (
            currentComponent === 2 && (
              <div className="user-posts-wrapper">
                <h2>{t("posts_title")}</h2>
                <div className="profile-user-posts">
                  {postLoading ? (
                    <p>{t("loading")}</p>
                  ) : posts.length ? (
                    posts.map((post) => (
                      <div className="profile-user-post-wrapper">
                        <Post key={post._id} post={post} />
                      </div>
                    ))
                  ) : (
                    <p>{t("no_posts")}</p>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
