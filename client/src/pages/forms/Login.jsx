import { useState } from "react";
import "./forms.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser, loginMechanic } from "../../redux/apiCalls/authApiCall";
import SwitchBar from "../../components/switch-bar/SwitchBar";
import { useTranslation } from "react-i18next";
import LoginForm from "./LoginForm";

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
          <LoginForm
            loginFunc={loginFormHandler}
            userEmail={email}
            setUserEmail={setEmail}
            userPassword={password}
            setUserPassword={setPassword}
          />
        ) : (
          <LoginForm
            loginFunc={loginMechanicFormHandler}
            userEmail={workshopOwnerEmail}
            setUserEmail={setWorkshopOwnerEmail}
            userPassword={workshopOwnerPassword}
            setUserPassword={setWorkshopOwnerPassword}
          />
        )}
      </div>
    </div>
  );
}

export default Login;
