import { useState } from "react";
import "./forms.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser, loginMechanic } from "../../redux/apiCalls/authApiCall";
import SwitchBar from "../../components/switch-bar/SwitchBar";
import { useTranslation } from "react-i18next";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [workshopOwnerEmail, setWorkshopOwnerEmail] = useState("");
  const [workshopOwnerPassword, setWorkshopOwnerPassword] = useState("");

  const [visibleForm, setVisibleForm] = useState(1);
  const { t, i18n } = useTranslation();
  document.title = t("login_page_title");

  const loginFormHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("قم بإدخال البريد الإلكتروني");
    if (password.trim() === "") return toast.error("قم بإدخال كلمة المرور ");

    dispatch(loginUser({ email, password }));
  };

  const loginMechanicFormHandler = (e) => {
    e.preventDefault();
    if (workshopOwnerEmail.trim() === "")
      return toast.error("قم بإدخال البريد الإلكتروني");
    if (workshopOwnerPassword.trim() === "")
      return toast.error("قم بإدخال كلمة المرور ");
    dispatch(
      loginMechanic({
        email: workshopOwnerEmail,
        password: workshopOwnerPassword,
      })
    );
  };

  return (
    <div
      className="login"
      style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
    >
      <div className="form">
        <SwitchBar
          option1={t("login_as_user")}
          option2={t("login_as_workshop_owner")}
          visibleForm={visibleForm}
          setVisibleForm={setVisibleForm}
        />
        {visibleForm === 1 ? (
          <form className="login-form" onSubmit={loginFormHandler}>
            <div className="login-form-input-wrapper">
              <label htmlFor="email">{t("email")}</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login-form-input-wrapper">
              <label htmlFor="password"> {t("password")}</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="login-form-btn" type="submit">
              {t("login")}
            </button>
          </form>
        ) : (
          <form className="login-form" onSubmit={loginMechanicFormHandler}>
            <div className="login-form-input-wrapper">
              <label htmlFor="workshopOwnerEmail"> {t("email")}</label>
              <input
                type="email"
                id="workshopOwnerEmail"
                value={workshopOwnerEmail}
                onChange={(e) => setWorkshopOwnerEmail(e.target.value)}
              />
            </div>

            <div className="login-form-input-wrapper">
              <label htmlFor="workshopOwnerPassword"> {t("password")}</label>
              <input
                type="password"
                id="workshopOwnerPassword"
                value={workshopOwnerPassword}
                onChange={(e) => setWorkshopOwnerPassword(e.target.value)}
              />
            </div>
            <button className="login-form-btn" type="submit">
              {t("login")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
