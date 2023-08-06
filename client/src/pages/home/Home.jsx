import { useState } from "react";
import { cars, provinces, services } from "../../dummyData";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function Home() {
  const navigate = useNavigate();
  const [service, setService] = useState("");
  const [car, setCar] = useState("");
  const [province, setProvince] = useState("");
  const { t, i18n } = useTranslation();
  document.title = t("home_page_title");

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
        <h1 className="home-top-title">{t("home_top_section_title")}</h1>
        <form className="search-bar" onSubmit={searchFormHandler}>
          <div
            className="search-bar-inputs-wrapper"
            style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
          >
            <div
              className="search-bar-select-wrapper"
              style={{
                backgroundColor: service && "var(--primary-color)",
              }}
            >
              <select
                className="search-bar-item"
                value={service}
                onChange={(e) => setService(e.target.value)}
                style={{
                  backgroundColor: service && "var(--primary-color)",
                  color: service && "white",
                }}
              >
                <option className="search-bar-item-option" value={""} disabled>
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
            <div className="search-bar-select-wrapper">
              <select
                className="search-bar-item"
                value={car}
                onChange={(e) => setCar(e.target.value)}
              >
                <option className="search-bar-item-option" value={""} disabled>
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

            <div className="search-bar-select-wrapper">
              <select
                className="search-bar-item"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              >
                <option className="search-bar-item-option" value={""} disabled>
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
      </section>
      {/* <section className="home-center">
        <div
          className="home-center-item"
          style={{ backgroundColor: "#134e6f" }}
        >
          <i className="bi bi-person-square"></i>
          <p>Create an account</p>
        </div>
        <div
          className="home-center-item"
          style={{ backgroundColor: "#ff6150" }}
        >
          <i className="bi bi-person-square"></i>
          <p>Browse the mechanic</p>
        </div>
        <div
          className="home-center-item "
          style={{ backgroundColor: "#1ac0c6" }}
        >
          <i className="bi bi-person-square"></i>
          <p>mechanic</p>
        </div>
      </section> */}

      {/* <section className="testimonial"></section> */}
    </div>
  );
}

export default Home;
