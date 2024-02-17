import { useTranslation } from "react-i18next";
import "./not-found.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="not-found">
      <Helmet>
        <title>{t("not_found_page_title")}</title>
        <meta
          name="description"
          content="Arabity - Not Found Page, this is page is not found"
        />
      </Helmet>
      <p className="not-found-text">هذه الصفحة غير موجودة </p>
      <p>
        العودة إلي <Link to={"/"}>الصفحة الرئيسية</Link>
      </p>
    </div>
  );
}

export default NotFound;
