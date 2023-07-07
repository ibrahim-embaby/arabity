import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/apiCalls/profileApiCall";
import { useParams } from "react-router-dom";
import "./profile.css";

function Profile() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserProfile(id));
  }, [id]);
  return (
    <div className="profile">
      <div className="profile-top">{profile.username}</div>
      <div className="profile-bottom">
        <div className="profile-bottom-right">
          <h2>المتابعات</h2>
        </div>
        <div className="profile-bottom-left">
          <h2>تقييماتك</h2>
        </div>
      </div>
    </div>
  );
}

export default Profile;
