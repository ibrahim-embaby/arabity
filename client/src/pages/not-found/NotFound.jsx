import { useTranslation } from "react-i18next";
import "./not-found.css";
import { Link } from "react-router-dom";

function NotFound() {
  const { t } = useTranslation();
  document.title = t("not_found_page_title");

  return (
    <div className="not-found">
      <p className="not-found-text">هذه الصفحة غير موجودة </p>
      <p>
        العودة إلي <Link to={"/"}>الصفحة الرئيسية</Link>
      </p>
    </div>
  );
}

export default NotFound;
