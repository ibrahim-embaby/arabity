import { useEffect, useState } from "react";
import "./forms.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  loginUser,
  loginWorkshopOwner,
  logoutUser,
} from "../../redux/apiCalls/authApiCall";
import SwitchBar from "../../components/switch-bar/SwitchBar";
function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [workshopOwnerEmail, setWorkshopOwnerEmail] = useState("");
  const [workshopOwnerPassword, setWorkshopOwnerPassword] = useState("");

  const [visibleForm, setVisibleForm] = useState(1);

  const loginFormHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("قم بإدخال البريد الإلكتروني");
    if (password.trim() === "") return toast.error("قم بإدخال كلمة المرور ");

    dispatch(loginUser({ email, password }));
  };

  const loginWorkshopOwnerFormHandler = (e) => {
    e.preventDefault();
    if (workshopOwnerEmail.trim() === "")
      return toast.error("قم بإدخال البريد الإلكتروني");
    if (workshopOwnerPassword.trim() === "")
      return toast.error("قم بإدخال كلمة المرور ");
    dispatch(
      loginWorkshopOwner({
        email: workshopOwnerEmail,
        password: workshopOwnerPassword,
      })
    );
  };
  return (
    <div className="login">
      <SwitchBar
        option1={"تسجيل دخول كمالك سيارة"}
        option2={"تسجيل دخول كمالك ورشة"}
        visibleForm={visibleForm}
        setVisibleForm={setVisibleForm}
      />

      <div className="form">
        {visibleForm === 1 ? (
          <form className="login-form" onSubmit={loginFormHandler}>
            <label htmlFor="email">البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">كلمة المرور</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-form-btn" type="submit">
              دخول
            </button>
          </form>
        ) : (
          <form className="login-form" onSubmit={loginWorkshopOwnerFormHandler}>
            <label htmlFor="workshopOwnerEmail">البريد الإلكتروني</label>
            <input
              type="email"
              id="workshopOwnerEmail"
              value={workshopOwnerEmail}
              onChange={(e) => setWorkshopOwnerEmail(e.target.value)}
            />
            <label htmlFor="workshopOwnerPassword">كلمة المرور</label>
            <input
              type="password"
              id="workshopOwnerPassword"
              value={workshopOwnerPassword}
              onChange={(e) => setWorkshopOwnerPassword(e.target.value)}
            />
            <button className="login-form-btn" type="submit">
              دخول
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
