import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

function HeaderRight({ toggle, setToggle }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [toggleMenu, setToggleMenu] = useState(false);
  const menuRef = useRef(null);

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
      {user ? (
        <>
          <p
            className="user-settings"
            onClick={() => setToggleMenu((prev) => !prev)}
            ref={menuRef}
          >
            <i className="bi bi-caret-down-fill"></i> {user?.username}
          </p>

          <div
            className="user-menu"
            style={{ display: toggleMenu ? "block" : "none" }}
          >
            <Link
              to={
                user.workshopName
                  ? `/workshop-owner/profile/${user.id}`
                  : `/profile/${user?.id}`
              }
              onClick={() => setToggleMenu(false)}
              className="user-menu-item"
            >
              حسابي
            </Link>
            <Link
              to={`/conversations`}
              onClick={() => setToggleMenu(false)}
              className="user-menu-item"
            >
              المحادثات
            </Link>
            <Link
              to={`/profile/${user?.id}/settings`}
              onClick={() => setToggleMenu(false)}
              className="user-menu-item"
            >
              إعدادت
            </Link>
            <p className="user-menu-item" onClick={handleLogoutUser}>
              تسجيل الخروج
            </p>
          </div>
        </>
      ) : (
        <>
          <Link to={"/login"} className="login-button auth-link">
            تسجيل الدخول
          </Link>
          <Link to={"/register"} className="register-button auth-link">
            إنشاء حساب
          </Link>
        </>
      )}
      <div className="header-menu" onClick={() => setToggle((perv) => !perv)}>
        {toggle ? (
          <i className="bi bi-x-lg"></i>
        ) : (
          <i className="bi bi-list"></i>
        )}
      </div>
    </div>
  );
}

export default HeaderRight;
