import { useTranslation } from "react-i18next";
import "./contact-us.css";
// import LinkedIn from "@mui/icons-material/LinkedIn";
// import GitHubIcon from "@mui/icons-material/GitHub";
import { useEffect } from "react";

function ContactUs() {
  const { t, i18n } = useTranslation();
  document.title = t("about_us_title");
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);
  return (
    <div
      className="contact-us"
      style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
    >
      <div className="contact-us-item about-app">
        <h3 className="contact-us-item-title">{t("about_app_title")}</h3>
        <p className="contact-us-item-desc">{t("about_app_desc")}</p>
      </div>
      <div className=" contact-us-item target">
        <h3 className="contact-us-item-title"> {t("our_vision_title")}</h3>
        <p className="contact-us-item-desc">{t("our_vision_desc")}</p>
      </div>
      {/* <div className="contact-us-item founders">
        <h3 className="contact-us-item-title">{t("founders_title")}</h3>
        <div className="founders-wrapper">
          <div className="founder-item">
            <img src="/images/founder1.jpg" alt="" className="founder-image" />
            <p className="founder-name">{t("founder")}</p>
            <div className="founder-links">
              <a
                href="https://www.linkedin.com/in/ibrahim-embaby/"
                target="_blank"
                className="founder-link founder-linkedin"
              >
                <LinkedIn sx={{ fontSize: 35 }} />
              </a>
              <a
                href="https://github.com/ibrahim-embaby"
                target="_blank"
                className="founder-link founder-github"
              >
                <GitHubIcon sx={{ fontSize: 35 }} />
              </a>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default ContactUs;
