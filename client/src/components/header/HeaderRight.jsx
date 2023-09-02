import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import ArrowDropDown from "@mui/icons-material/KeyboardArrowDown";
import SwitchLanguage from "../switch-language/SwitchLanguage";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import limitText from "../../utils/limitText.js";

function HeaderRight({ toggle, setToggle }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [toggleMenu, setToggleMenu] = useState(false);
  const menuRef = useRef(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleLogoutUser = () => {
    setToggleMenu(false);
    dispatch(logoutUser());
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggleMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    const handleBeforeUnload = () => {
      setToggleMenu(false);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [menuRef]);

  return (
    <div className="header-right">
      <SwitchLanguage />
      {user ? (
        <>
          <div
            className="user-settings"
            onClick={() => setToggleMenu(!toggleMenu)}
            ref={menuRef}
          >
            <ArrowDropDown size="medium" />
            <p
              style={{
                direction: i18n.language === "ar" ? "rtl" : "ltr",
              }}
            >
              {limitText(user?.username, 10)}
            </p>
            <div
              className="user-menu"
              style={{ display: toggleMenu ? "block" : "none" }}
            >
              <Link
                to={
                  user.workshopName
                    ? `/mechanic/profile/${user.id}`
                    : `/profile/${user?.id}`
                }
                onClick={() => setToggleMenu(false)}
                className="user-menu-item"
              >
                {t("dropdown_account")}
              </Link>
              <Link
                to={`/conversations`}
                onClick={() => setToggleMenu(false)}
                className="user-menu-item"
              >
                {t("dropdown_conversations")}
              </Link>
              <Link
                to={`/profile/${user?.id}/settings`}
                onClick={() => setToggleMenu(false)}
                className="user-menu-item"
              >
                {t("dropdown_settings")}
              </Link>
              <p
                className="user-menu-item"
                onClick={handleLogoutUser}
                style={{ borderBottom: "none" }}
              >
                {t("logout")}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="header-auth-links">
          <Link to={"/login"} className="login-button auth-link">
            {t("login")}
          </Link>
          <Link to={"/register"} className="register-button auth-link">
            {t("register")}
          </Link>
        </div>
      )}
      <div className="header-menu" onClick={() => setToggle((perv) => !perv)}>
        {toggle ? (
          <CloseIcon
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: 30,
              cursor: "pointer",
            }}
          />
        ) : (
          <MenuIcon
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: 30,
              cursor: "pointer",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default HeaderRight;
