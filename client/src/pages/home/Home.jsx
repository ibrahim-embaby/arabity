import { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SearchIcon from "@mui/icons-material/Search";
import MessageIcon from "@mui/icons-material/Message";
import appVision from "../../assets/app-vision.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchControls } from "../../redux/apiCalls/controlsApiCalls";
import { Helmet } from "react-helmet-async";
import { Loading } from "../../components/loading/Loading";

function Home() {
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [car, setCar] = useState(null);
  const [province, setProvince] = useState(null);
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const { services, provinces, cars, loading } = useSelector(
    (state) => state.controls
  );
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  useEffect(() => {
    dispatch(fetchControls());
  }, []);

  const searchFormHandler = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (service) {
      queryParams.append("service", service?.value);
    }

    if (car) {
      queryParams.append("car", car?.value);
    }

    if (province) {
      queryParams.append("province", province?.value);
    }
    navigate(`/search/workshops?${queryParams.toString()}`, {
      state: {
        service: { value: service?.value, _id: service?._id },
        car: { value: car?.value, _id: car?._id },
        province: { value: province?.value, _id: province?._id },
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>{t("home_page_title")}</title>
        <meta
          name="description"
          content="Arabity - Home Page, search for the closest mechanic to you"
        />
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <div className="home">
          <section className="home-top">
            <div className="home-top-wrapper">
              <h1 className="home-top-title">{t("home_top_section_title")}</h1>
              <form
                className="search-bar"
                onSubmit={searchFormHandler}
                style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
              >
                <div className="search-bar-inputs-wrapper">
                  <div
                    className="search-bar-select-wrapper"
                    style={{
                      backgroundColor: service && "#ffe285",
                      border: service && "black",
                    }}
                  >
                    <select
                      className="search-bar-item"
                      value={service ? JSON.stringify(service) : ""}
                      onChange={(e) => setService(JSON.parse(e.target.value))}
                      style={{
                        backgroundColor: service && "#ffe285",
                        color: service && "black",
                      }}
                    >
                      <option
                        className="search-bar-item-option"
                        value={""}
                        disabled
                      >
                        {t("service_select")}
                      </option>
                      {Array.from(services)?.sort((a, b) => (a.label[i18n.language] > b.label[i18n.language]) ? 1 : -1)?.map((service) => (
                        <option
                          className="search-bar-item-option"
                          key={service.value}
                          value={JSON.stringify(service)}
                        >
                          {service.label[i18n.language]}
                        </option>
                      ))}
                    </select>
                    {service && (
                      <HighlightOffIcon
                        sx={{
                          color: "red",
                          cursor: "pointer",
                        }}
                        onClick={() => setService("")}
                      />
                    )}
                  </div>

                  <div
                    className="search-bar-select-wrapper"
                    style={{
                      backgroundColor: car && "#ffe285",
                      border: car && "none",
                    }}
                  >
                    <select
                      className="search-bar-item"
                      value={car ? JSON.stringify(car) : ""}
                      onChange={(e) => setCar(JSON.parse(e.target.value))}
                      style={{
                        backgroundColor: car && "#ffe285",
                        color: car && "black",
                      }}
                    >
                      <option
                        className="search-bar-item-option"
                        value={""}
                        disabled
                      >
                        {t("car_select")}
                      </option>
                      {Array.from(cars)?.sort((a, b) => (a.label[i18n.language] > b.label[i18n.language]) ? 1 : -1)?.map((car) => (
                        <option
                          className="search-bar-item-option"
                          key={car.value}
                          value={JSON.stringify(car)}
                        >
                          {car.label[i18n.language]}
                        </option>
                      ))}
                    </select>
                    {car && (
                      <HighlightOffIcon
                        sx={{
                          color: "red",
                          cursor: "pointer",
                        }}
                        onClick={() => setCar("")}
                      />
                    )}
                  </div>

                  <div
                    className="search-bar-select-wrapper"
                    style={{
                      backgroundColor: province && "#ffe285",
                      border: province && "none",
                    }}
                  >
                    <select
                      className="search-bar-item"
                      value={province ? JSON.stringify(province) : ""}
                      onChange={(e) => setProvince(JSON.parse(e.target.value))}
                      style={{
                        backgroundColor: province && "#ffe285",
                        color: province && "black",
                      }}
                    >
                      <option
                        className="search-bar-item-option"
                        value={""}
                        disabled
                      >
                        {t("province_select")}
                      </option>
                      {Array.from(provinces)?.sort((a, b) => (a.label[i18n.language] > b.label[i18n.language]) ? 1 : -1)?.map((province) => (
                        <option
                          className="search-bar-item-option"
                          key={province.value}
                          value={JSON.stringify(province)}
                        >
                          {province.label[i18n.language]}
                        </option>
                      ))}
                    </select>
                    {province && (
                      <HighlightOffIcon
                        sx={{
                          color: "red",
                          cursor: "pointer",
                        }}
                        onClick={() => setProvince("")}
                      />
                    )}
                  </div>
                </div>
                <button className="search-bar-btn" type="submit">
                  {t("search_btn")}
                </button>
              </form>
            </div>
          </section>
          <div
            className="container"
            style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
          >
            <div className="home-sections-wrapper">
              <section className="home-app-features">
                <div className="home-app-features-item">
                  <PersonAddAltIcon className="home-app-features-item-icon" />
                  <p>{t("home_card_create_account")}</p>
                </div>

                <div className="home-app-features-item">
                  <SearchIcon className="home-app-features-item-icon" />
                  <p>{t("home_card_browse")}</p>
                </div>

                <div className="home-app-features-item ">
                  <MessageIcon className="home-app-features-item-icon" />
                  <p>{t("home_card_contact")}</p>
                </div>
              </section>

              <section className="home-about-app">
                <div className="home-about-app-right">
                  <img
                    className="home-about-app-right-img"
                    src={appVision}
                    alt=""
                  />
                </div>
                <div className="home-about-app-left">
                  <p>{t("our_vision_desc")}</p>
                  <p>{t("our_vision_desc")}</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
