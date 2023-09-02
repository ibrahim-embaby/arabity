import React, { useEffect } from "react";
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

function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { ratings, loading } = useSelector((state) => state.rating);
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  document.title = t("user_profile_page_title");

  useEffect(() => {
    dispatch(fetchUserProfile(id));
    dispatch(fetchSingleUserRatings(id));
  }, [id]);

  const handleDeleteRating = (ratingId) => {
    dispatch(deleteRating(ratingId));
  };
  return (
    <div
      className="profile"
      style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
    >
      <div className="profile-top">{user.username}</div>
      <div className="container">
        <div className="profile-bottom">
          <div className="profile-bottom-right">
            <h2>{t("profile_favorites")}</h2>
          </div>
          <div className="profile-bottom-left">
            <h2>{t("profile_ratings")}</h2>
            <div className="user-ratings-wrapper">
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
        </div>
      </div>
    </div>
  );
}

export default Profile;
