import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchMechanic,
  uploadWorkshopImg,
} from "../../redux/apiCalls/mechanicApiCall";
import AddRating from "../../components/rating/AddRating";
import RatingComponent from "../../components/rating/RatingComponent";
import { createConversation } from "../../redux/apiCalls/conversationApiCall";
import { toast } from "sonner";
import RatingMui from "../../components/rating/RatingMui";
import { useTranslation } from "react-i18next";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CameraIcon from "@mui/icons-material/Camera";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Post from "../../components/post/Post";
import CreatePost from "../../components/post/CreatePost";
import { fetchUserPosts } from "../../redux/apiCalls/postApiCall";
import { Helmet } from "react-helmet-async";
import { Loading } from "../../components/loading/Loading";

function WorkshopProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [avgRating, setAvgRating] = useState(0);
  const [workshopImg, setWorkshopImg] = useState(null);
  const [tab, setTab] = useState("mechanic_data");
  const { mechanic, loading } = useSelector((state) => state.mechanic);
  const { posts, postLoading } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setTab("mechanic_data");
    dispatch(fetchMechanic(id));
  }, [id]);

  useEffect(() => {
    if (mechanic?.mechanicRatings?.length) {
      let sum = 0;
      for (let i = 0; i < mechanic?.mechanicRatings?.length; i++) {
        sum += mechanic?.mechanicRatings[i].rating;
      }
      setAvgRating(sum / mechanic?.mechanicRatings?.length);
    } else {
      setAvgRating(0);
    }
  }, [mechanic?.mechanicRatings?.length]);

  const searchTagHandler = (service, car) => {
    const queryParams = new URLSearchParams();
    if (service) {
      queryParams.append("service", service.value);
    }

    if (car) {
      queryParams.append("car", car.value);
    }
    navigate(`/search/workshops?${queryParams.toString()}`, {
      state: {
        car: { value: car?.value, _id: car?._id },
        service: { value: service?.value, _id: service?._id },
      },
    });
  };

  const handleCreateConversation = () => {
    if (!user) {
      return toast.info(t("login_required"));
    }
    try {
      const conversationInfo = {
        userId: user.id,
        mechanicId: id,
      };
      dispatch(createConversation(conversationInfo));
      navigate(`/message/${user.id + id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadMechanicImg = (e) => {
    e.preventDefault();
    if (!workshopImg) return toast.error("لا توجد صورة");

    dispatch(uploadWorkshopImg(id, workshopImg));
    setWorkshopImg(null);
  };

  const handleMechanicPosts = () => {
    setTab("mechanic_posts");
    dispatch(fetchUserPosts(id));
  };
  return (
    <>
      <Helmet>
        <title>{t("workshop_profile_page_title")}</title>
        <meta
          name="description"
          content="Arabity - Mechanic Page, this mechanic page, you can find all mechanic details"
        />
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="mechanic-profile"
          style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
        >
          <div className="container">
            <div className="mechanic-profile-wrapper">
              <div className="mechanic-profile-top">
                <div className="mechanic-profile-image-wrapper">
                  <Zoom>
                    <img
                      src={
                        workshopImg
                          ? URL.createObjectURL(workshopImg)
                          : mechanic?.profilePhoto.url
                          ? mechanic?.profilePhoto.url
                          : "https://st2.depositphotos.com/1007566/12186/v/600/depositphotos_121865140-stock-illustration-man-avatar-mechanic-isolated.jpg"
                      }
                      alt=""
                      className="mechanic-profile-image"
                    />
                  </Zoom>
                  {user?.id === id && (
                    <form onSubmit={handleUploadMechanicImg}>
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
                        <button
                          type="submit"
                          className="upload-workshop-img-btn"
                        >
                          {t("upload")}
                        </button>
                      )}
                    </form>
                  )}
                </div>
                <p className="workshop-name">{mechanic?.workshopName}</p>

                <RatingMui rating={avgRating} />
              </div>
              <div className="mechanic-profile-info-wrapper">
                <div className="mechanic-profile-info">
                  <div className="tabs">
                    <div
                      onClick={() => setTab("mechanic_data")}
                      className="mechanic-data-tab mechanic-tab"
                      style={{
                        backgroundColor: tab === "mechanic_data" && "#ddd",
                      }}
                    >
                      {t("mechanic_data")}
                    </div>
                    <div
                      onClick={handleMechanicPosts}
                      className="mechanic-posts-tab mechanic-tab"
                      style={{
                        backgroundColor: tab === "mechanic_posts" && "#ddd",
                      }}
                    >
                      {t("posts_title")}
                    </div>
                  </div>
                  {tab === "mechanic_data" ? (
                    <>
                      <div className="mechanic-profile-info-desc mechanic-profile-info-item">
                        <span className="mechanic-profile-info-title">
                          {t("workshop_desc_title")}
                        </span>
                        {mechanic?.workshopDescription ? (
                          <div className="workshop-desc">
                            {mechanic?.workshopDescription}
                          </div>
                        ) : (
                          <p className="no-workshop-desc">
                            {t("no_workshop_desc")}
                          </p>
                        )}
                      </div>

                      <div className="mechanic-profile-info-item">
                        <span className="mechanic-profile-info-title">
                          {t("workshop_services")}
                        </span>
                        <div className="mechanic-profile-info-services">
                          {mechanic?.workshopServices.map((service, index) => (
                            <p
                              key={service._id}
                              className="service-tag"
                              onClick={() => searchTagHandler(service, "")}
                            >
                              {service.label[i18n.language]}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="mechanic-profile-info-item">
                        <span className="mechanic-profile-info-title">
                          {t("workshop_cars")}
                        </span>
                        <div className="mechanic-profile-info-services">
                          {mechanic?.cars.map((car, index) => (
                            <p
                              key={car._id}
                              onClick={() => searchTagHandler("", car)}
                              className="service-tag"
                            >
                              {car.label[i18n.language]}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="mechanic-profile-info-item">
                        <span className="mechanic-profile-info-title">
                          {t("workshop_branches")} (
                          {mechanic?.workshopBranches.length})
                        </span>
                        <div className="mechanic-profile-info-branches">
                          {mechanic?.workshopBranches.map((branch, index) => (
                            <div
                              key={index}
                              className="mechanic-profile-info-branch"
                            >
                              <h5 className="mechanic-profile-info-branch-title">
                                <LocationOnIcon />
                                {branch.province.label[i18n.language]} -{" "}
                                {branch.city.label[i18n.language]}
                              </h5>
                              <p className="branch-address">
                                {t("workshop_address")}: {branch.address}
                              </p>
                              <p className="branch-mobile">
                                {t("workshop_mobile")}: {branch.mobile}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mechanic-profile-info-item mechanic-profile-info-ratings">
                        <span className="mechanic-profile-info-title">
                          {t("workshop_ratings")} (
                          {mechanic?.mechanicRatings.length})
                        </span>
                        {user &&
                          !user.workshopName &&
                          !mechanic?.mechanicRatings.filter(
                            (item) => item.user?._id === user.id
                          ).length && <AddRating id={id} />}

                        {mechanic?.mechanicRatings.length
                          ? mechanic?.mechanicRatings.map((r, index) => (
                              <RatingComponent key={index} userRate={r} />
                            ))
                          : t("no_workshop_ratings")}
                      </div>
                    </>
                  ) : (
                    <div className="mechanic_posts">
                      {user?.id === id && <CreatePost privacy={"restricted"} />}
                      <hr />
                      {postLoading ? (
                        <p>{t("loading")}</p>
                      ) : posts.length ? (
                        posts.map((post) => <Post key={post._id} post={post} />)
                      ) : (
                        <p>{t("no_posts")}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="mechanic-profile-contact">
                  <h4> {t("contact_information")}</h4>
                  <p className="mechanic-profile-contact-item">
                    {mechanic?.username}
                  </p>

                  {(!user || !user.workshopName) && (
                    <p
                      className="mechanic-profile-contact-btn"
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
      )}
    </>
  );
}

export default WorkshopProfile;
