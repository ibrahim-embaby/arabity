import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchWorkshopOwner } from "../../redux/apiCalls/workshopOwnerApiCall";
import CircularProgress from "@mui/joy/CircularProgress";
import AddRating from "../../components/rating/AddRating";
import RatingComponent from "../../components/rating/RatingComponent";
import { createConversation } from "../../redux/apiCalls/conversationApiCall";
import { toast } from "react-toastify";
import RatingMui from "../../components/rating/RatingMui";
import { useTranslation } from "react-i18next";

function WorkshopProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [avgRating, setAvgRating] = useState(0);
  const { workshopOwner, loading } = useSelector(
    (state) => state.workshopOwner
  );
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { t } = useTranslation();
  document.title = t("workshop_profile_page_title");

  useEffect(() => {
    dispatch(fetchWorkshopOwner(id));
    if (workshopOwner?.workshopRatings?.length) {
      let sum = 0;
      for (let i = 0; i < workshopOwner?.workshopRatings?.length; i++) {
        sum += workshopOwner?.workshopRatings[i].rating;
      }
      setAvgRating(sum / workshopOwner?.workshopRatings?.length);
    } else {
      setAvgRating(0);
    }
  }, [id, workshopOwner?.workshopRatings?.length, dispatch]);

  const searchTagHandler = (service = "", car = "") => {
    const queryParams = new URLSearchParams();
    if (service) {
      queryParams.append("service", service);
    }

    if (car) {
      queryParams.append("car", car);
    }
    navigate(`/search/workshops?${queryParams.toString()}`);
  };

  const handleCreateConversation = () => {
    if (!user) {
      return toast.info("يرجي تسجيل الدخول أولًا");
    }
    try {
      const conversationInfo = {
        userId: user.id,
        WorkshopOwnerId: id,
      };
      dispatch(createConversation(conversationInfo));
      navigate(`/message/${user.id + id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return loading ? (
    <div
      className="loading-page"
      style={{
        minHeight: "calc(100vh - var(--difference-value))",
      }}
    >
      <CircularProgress color="primary" />
    </div>
  ) : (
    <div className="workshopOwner-profile">
      <div className="workshopOwner-profile-top">
        {user?.id === id && <button className="edit-profile">تعديل</button>}
        <div className="workshopOwner-profile-image-wrapper">
          <img
            src="/images/workshop-owner-avatar.png"
            alt=""
            className="workshopOwner-profile-image"
          />
          {user?.id === id && (
            <form>
              <label htmlFor="file" className="edit-profile-pic">
                <i className="bi bi-camera-fill"></i>
              </label>
              <input type="file" hidden id="file" />
            </form>
          )}
        </div>
        <p className="workshop-name">{workshopOwner?.workshopName}</p>

        <RatingMui rating={avgRating} />
      </div>
      <div className="workshopOwner-profile-info-wrapper">
        <div className="workshopOwner-profile-info">
          <div className="workshopOwner-profile-info-desc workshopOwner-profile-info-item">
            <span className="workshopOwner-profile-info-title">
              {t("workshop_desc_title")}
            </span>
            {workshopOwner?.workshopDescription ? (
              <div className="workshop-desc">
                {workshopOwner?.workshopDescription}
              </div>
            ) : (
              <p className="no-workshop-desc">{t("no_workshop_desc")}</p>
            )}
          </div>

          <div className="workshopOwner-profile-info-item">
            <span className="workshopOwner-profile-info-title">
              {t("workshop_services")}
            </span>
            <div className="workshopOwner-profile-info-services">
              {workshopOwner?.workshopServices.map((service) => (
                <p
                  key={service}
                  className="service-tag"
                  onClick={() => searchTagHandler(service, "")}
                >
                  {service}
                </p>
              ))}
            </div>
          </div>

          <div className="workshopOwner-profile-info-item">
            <span className="workshopOwner-profile-info-title">
              {t("workshop_cars")}
            </span>
            <div className="workshopOwner-profile-info-services">
              {workshopOwner?.cars.map((car, index) => (
                <p
                  onClick={() => searchTagHandler("", car)}
                  key={index}
                  className="service-tag"
                >
                  {car}
                </p>
              ))}
            </div>
          </div>

          <div className="workshopOwner-profile-info-item">
            <span className="workshopOwner-profile-info-title">
              {t("workshop_branches")}
            </span>
            <div className="workshopOwner-profile-info-branches">
              {workshopOwner?.workshopBranches.map((branch) => (
                <p
                  key={branch.branchProvince}
                  className="workshopOwner-profile-info-branch"
                >
                  <h5>
                    <i className="bi bi-geo-alt-fill search-item-title"></i>
                    {branch.branchProvince} - {branch.branchCity}
                  </h5>
                  <p>العنوان التفصيلي: {branch.branchAddress}</p>
                  <p>تليفون الفرع: {branch.branchMobile}</p>
                  <br />
                </p>
              ))}
            </div>
          </div>

          <div className="workshopOwner-profile-info-item workshopOwner-profile-info-ratings">
            <span className="workshopOwner-profile-info-title">
              {t("workshop_ratings")}
            </span>
            {user &&
              !user.workshopName &&
              !workshopOwner?.workshopRatings.filter(
                (item) => item.user._id === user.id
              ).length && <AddRating id={id} />}

            {workshopOwner?.workshopRatings.length
              ? workshopOwner?.workshopRatings.map((r) => (
                  <RatingComponent key={r._id} userRate={r} />
                ))
              : t("no_workshop_ratings")}
          </div>
        </div>
        <div className="workshopOwner-profile-contact">
          <h4> {t("contact_information")}</h4>
          <p className="workshopOwner-profile-contact-item">
            <i className="bi bi-person-fill search-item-title"></i>
            {workshopOwner?.username}
          </p>

          {(!user || !user.workshopName) && (
            <p
              className="workshopOwner-profile-contact-btn"
              onClick={handleCreateConversation}
            >
              {t("send_message_btn")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkshopProfile;
