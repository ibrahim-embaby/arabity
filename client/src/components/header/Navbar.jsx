import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function Navbar({ toggle, setToggle }) {
  const { user } = useSelector((state) => state.auth);
  const [currentTab, setCurrentTab] = useState(1);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const selectedTabColor = "var(--primary-color)";
  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentTab(1);
    } else if (location.pathname === "/contact-us") {
      setCurrentTab(2);
    } else if (location.pathname === "/admin") {
      setCurrentTab(3);
    } else {
      setCurrentTab(0);
    }
  }, [location.pathname, currentTab]);
  return (
    <nav
      className="navbar"
      style={{
        clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        direction: i18n.language === "en" ? "rtl" : "ltr",
      }}
    >
      <ul>
        <Link
          to={"/"}
          onClick={() => {
            setCurrentTab(1);
            setToggle(false);
          }}
          style={{
            color: currentTab === 1 && selectedTabColor,
          }}
        >
          {t("navbar_main")}
        </Link>
        <Link
          onClick={() => {
            setCurrentTab(2);
            setToggle(false);
          }}
          style={{
            color: currentTab === 2 && selectedTabColor,
          }}
          to={"/contact-us"}
        >
          {t("navbar_contact")}
        </Link>
        {user?.isAdmin && (
          <Link
            to={"/admin"}
            onClick={() => {
              setCurrentTab(3);
              setToggle(false);
            }}
            style={{
              color: currentTab === 3 && selectedTabColor,
            }}
          >
            {t("navbar_admin")}
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
