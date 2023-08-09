import { useEffect, useState } from "react";
import { cars, provinces, services } from "../../dummyData";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SearchIcon from "@mui/icons-material/Search";
import MessageIcon from "@mui/icons-material/Message";
import appVision from "../../assets/app-vision.jpg";

// import Testimonial from "./Testimonial";

// import user1 from "../../assets/user-1.jpg";
// import user2 from "../../assets/user-2.jpg";
// import user3 from "../../assets/user-3.jpg";
// import user4 from "../../assets/user-4.jpg";

// const testimonials = [
//   {
//     img: user1,
//     text: "Lorem ipsum dolor sit amet,\
//      consectetur adipisicing elit. Repudiandae tempora\
//       similique quidem omnis quam nemo deleniti vel autem iure, \
//       rem asperiores, ipsa quasi temporibus vero eum quisquam at. Magni, porro!",
//   },
//   {
//     img: user2,
//     text: "good",
//   },
//   {
//     img: user3,
//     text: "good",
//   },
//   {
//     img: user4,
//     text: "good",
//   },
// ];

function Home() {
  const navigate = useNavigate();
  const [service, setService] = useState("");
  const [car, setCar] = useState("");
  const [province, setProvince] = useState("");
  const { t, i18n } = useTranslation();
  document.title = t("home_page_title");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);
  const searchFormHandler = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (service) {
      queryParams.append("service", service);
    }

    if (car) {
      queryParams.append("car", car);
    }

    if (province) {
      queryParams.append("province", province);
    }
    navigate(`/search/workshops?${queryParams.toString()}`);
  };

  return (
    <div className="home">
      <section className="home-top">
        <div className="home-top-wrapper">
          <h1 className="home-top-title">{t("home_top_section_title")}</h1>
          <form className="search-bar" onSubmit={searchFormHandler}>
            <div
              className="search-bar-inputs-wrapper"
              style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
            >
              <div
                className="search-bar-select-wrapper"
                style={{
                  backgroundColor: service && "#ffe285",
                  border: service && "black",
                }}
              >
                <select
                  className="search-bar-item"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
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
                  {services.map((service) => (
                    <option
                      className="search-bar-item-option"
                      key={service.value}
                      value={service.label}
                    >
                      {service.label}
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
                  value={car}
                  onChange={(e) => setCar(e.target.value)}
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
                  {cars.map((car) => (
                    <option
                      className="search-bar-item-option"
                      key={car.value}
                      value={car.value}
                    >
                      {car.label}
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
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
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
                  {provinces.map((province) => (
                    <option
                      className="search-bar-item-option"
                      key={province.name}
                      value={province.name}
                    >
                      {province.name}
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

          {/* <section className="testimonial">
          <div className="testimonial-wrapper">
            <Testimonial />
          </div>
        </section> */}
          {/* <section className="testimonial">
          <div className="testimonial-wrapper">
            {testimonials.map((testimonial, index) => (
              <Testimonial
                key={index}
                img={testimonial.img}
                text={testimonial.text}
                visible={visible}
                index={index}
              />
            ))}
          </div>
        </section> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
