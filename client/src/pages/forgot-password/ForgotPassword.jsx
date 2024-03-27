import "./forgot-password.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/apiCalls/authApiCall";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("user");

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email) return toast.error("email is required");
    dispatch(forgotPassword(email, userType));
    setEmail("");
  };

  const { t } = useTranslation();
  return (
    <div className="forgot-password">
      <Helmet>
        <title>{t("Forgot Password")}</title>
        <meta
          name="description"
          content="Arabity - Forgot Password Page, here you can send an email to reset your password"
        />
      </Helmet>
      <form onSubmit={handleForgotPassword} className="forgot-password-form">
        <h1 className="forgot-password-title">Reset your password</h1>
        <p className="forgot-password-desc">
          Please choose your identity and provide the email address you used
          when you signed up for your Arabity account.
        </p>
        <div className="forgot-password-user-type">
          <div className="radio-input-wrapper">
            <input
              type="radio"
              name="user-type"
              id="user"
              onClick={() => setUserType("user")}
              defaultChecked={userType === "user"}
            />
            <label htmlFor="user">user</label>
          </div>
          <div className="radio-input-wrapper">
            <input
              type="radio"
              name="user-type"
              id="mechanic"
              onClick={() => setUserType("mechanic")}
              defaultChecked={userType === "mechanic"}
            />
            <label htmlFor="mechanic">mechanic</label>
          </div>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="forgot-password-input"
          required
        />
        <button className="forgot-password-btn">Send Email </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
