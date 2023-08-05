import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function HeaderLeft() {
  const { t } = useTranslation();
  return (
    <div className="header-left">
      <Link to={"/"}>{t("header_title")}</Link>
    </div>
  );
}

export default HeaderLeft;
