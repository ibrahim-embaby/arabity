import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function LoginForm({
  loginFunc,
  userEmail,
  setUserEmail,
  userPassword,
  setUserPassword,
}) {
  const { t } = useTranslation();
  return (
    <form className="login-form" onSubmit={loginFunc}>
      <div className="login-form-input-wrapper">
        <label htmlFor="workshopOwnerEmail"> {t("email")}</label>
        <input
          type="email"
          id="workshopOwnerEmail"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </div>

      <div className="login-form-input-wrapper">
        <label htmlFor="workshopOwnerPassword"> {t("password")}</label>
        <input
          type="password"
          id="workshopOwnerPassword"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
      </div>
      <button className="login-form-btn" type="submit">
        {t("login")}
      </button>
      <Link to={"/forgot-password"}>{t("forgot_password")}</Link>
    </form>
  );
}

export default LoginForm;
