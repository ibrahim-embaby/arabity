import "./footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import LinkedIn from "@mui/icons-material/LinkedIn";
import { useTranslation } from "react-i18next";
function Footer() {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <div className="footer-left">{t("footer_title")}</div>
      <div className="footer-right">
        <a className="footer-right-icon facebook">
          <FacebookIcon sx={{ fontSize: 35 }} />
        </a>
        <p className="footer-right-icon instagram">
          <Instagram sx={{ fontSize: 35 }} />
        </p>
        <a
          href="https://www.linkedin.com/in/ibrahim-embaby/"
          target="_blank"
          className="footer-right-icon linkedin"
        >
          <LinkedIn sx={{ fontSize: 35 }} />
        </a>
      </div>
    </div>
  );
}

export default Footer;
