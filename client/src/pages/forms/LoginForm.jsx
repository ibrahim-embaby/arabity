import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function LoginForm({ loginFunc }) {
  const { t } = useTranslation();
  return (
    <form className="login-form" onSubmit={loginFunc}>
      <div className="login-form-input-wrapper">
        <label htmlFor="email"> {t("email")}</label>
        <input type="email" id="email" name="email" required min={5} />
      </div>

      <div className="login-form-input-wrapper">
        <label htmlFor="password"> {t("password")}</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button className="login-form-btn" type="submit">
        {t("login")}
      </button>
      <Link to={"/forgot-password"}>{t("forgot_password")}</Link>
    </form>
  );
}

export default LoginForm;
