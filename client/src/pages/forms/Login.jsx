import { useState } from "react";
import "./forms.css";
import { useDispatch } from "react-redux";
import { loginUser, loginMechanic } from "../../redux/apiCalls/authApiCall";
import SwitchBar from "../../components/switch-bar/SwitchBar";
import { useTranslation } from "react-i18next";
import LoginForm from "./LoginForm";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();

  const [visibleForm, setVisibleForm] = useState(1);
  const { t, i18n } = useTranslation();
  document.title = t("login_page_title");

  const loginFormHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);

    if (payload?.email === "") return toast.error("please enter your email");
    if (payload?.password === "")
      return toast.error("please enter your password");

    dispatch(visibleForm === 1 ? loginUser(payload) : loginMechanic(payload));
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
        <LoginForm loginFunc={loginFormHandler} />
      </div>
    </div>
  );
}

export default Login;
