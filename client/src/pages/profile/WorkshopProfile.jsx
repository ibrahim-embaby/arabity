import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchWorkshopOwner,
  uploadWorkshopImg,
} from "../../redux/apiCalls/workshopOwnerApiCall";
import CircularProgress from "@mui/joy/CircularProgress";
import AddRating from "../../components/rating/AddRating";
import RatingComponent from "../../components/rating/RatingComponent";
import { createConversation } from "../../redux/apiCalls/conversationApiCall";
import { toast } from "react-toastify";
import RatingMui from "../../components/rating/RatingMui";
import { useTranslation } from "react-i18next";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CameraIcon from "@mui/icons-material/Camera";

function WorkshopProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [avgRating, setAvgRating] = useState(0);
  const [workshopImg, setWorkshopImg] = useState(null);
  const { workshopOwner, loading } = useSelector(
    (state) => state.workshopOwner
  );
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { t, i18n } = useTranslation();

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

  const handleUploadWorkshopImg = (e) => {
    e.preventDefault();
    if (!workshopImg) return toast.error("لا توجد صورة");
    const formData = new FormData();
    formData.append("image", workshopImg);
    dispatch(uploadWorkshopImg(id, formData));
    setWorkshopImg(null);
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
    <div
      className="workshopOwner-profile"
      style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
    >
      <div className="container">
        <div className="workshopOwner-profile-wrapper">
          <div className="workshopOwner-profile-top">
            {user?.id === id && <button className="edit-profile">تعديل</button>}
            <div className="workshopOwner-profile-image-wrapper">
              <img
                src={
                  workshopImg
                    ? URL.createObjectURL(workshopImg)
                    : workshopOwner?.workshopPhoto.url
                    ? workshopOwner?.workshopPhoto.url
                    : "https://st2.depositphotos.com/1007566/12186/v/600/depositphotos_121865140-stock-illustration-man-avatar-mechanic-isolated.jpg"
                }
                alt=""
                className="workshopOwner-profile-image"
              />
              {user?.id === id && (
                <form onSubmit={handleUploadWorkshopImg}>
                  <label htmlFor="file" className="edit-profile-pic">
                    <CameraIcon />
                  </label>
                  <input
                    type="file"
                    hidden
                    id="file"
                    onChange={(e) => {
                      setWorkshopImg(e.target.files[0]);
                    }}
                  />
                  {workshopImg && (
                    <button type="submit" className="upload-workshop-img-btn">
                      upload
                    </button>
                  )}
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
                  {workshopOwner?.workshopServices.map((service, index) => (
                    <p
                      key={index}
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
                      key={index}
                      onClick={() => searchTagHandler("", car)}
                      className="service-tag"
                    >
                      {car}
                    </p>
                  ))}
                </div>
              </div>

              <div className="workshopOwner-profile-info-item">
                <span className="workshopOwner-profile-info-title">
                  {t("workshop_branches")} (
                  {workshopOwner?.workshopBranches.length})
                </span>
                <div className="workshopOwner-profile-info-branches">
                  {workshopOwner?.workshopBranches.map((branch, index) => (
                    <div
                      key={index}
                      className="workshopOwner-profile-info-branch"
                    >
                      <h5 className="workshopOwner-profile-info-branch-title">
                        <LocationOnIcon />
                        {branch.branchProvince} - {branch.branchCity}
                      </h5>
                      <p>العنوان التفصيلي: {branch.branchAddress}</p>
                      <p>تليفون الفرع: {branch.branchMobile}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="workshopOwner-profile-info-item workshopOwner-profile-info-ratings">
                <span className="workshopOwner-profile-info-title">
                  {t("workshop_ratings")} (
                  {workshopOwner?.workshopRatings.length})
                </span>
                {user &&
                  !user.workshopName &&
                  !workshopOwner?.workshopRatings.filter(
                    (item) => item.user._id === user.id
                  ).length && <AddRating id={id} />}

                {workshopOwner?.workshopRatings.length
                  ? workshopOwner?.workshopRatings.map((r, index) => (
                      <RatingComponent key={index} userRate={r} />
                    ))
                  : t("no_workshop_ratings")}
              </div>
            </div>

            <div className="workshopOwner-profile-contact">
              <h4> {t("contact_information")}</h4>
              <p className="workshopOwner-profile-contact-item">
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
      </div>
    </div>
  );
}

export default WorkshopProfile;
