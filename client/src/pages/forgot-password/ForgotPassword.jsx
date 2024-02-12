import "./forgot-password.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/apiCalls/authApiCall";
import { toast } from "react-toastify";

function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email) return toast.error("email is required");
    dispatch(forgotPassword(email));
    setEmail("");
  };
  return (
    <div className="forgot-password">
      <form onSubmit={handleForgotPassword} className="forgot-password-form">
        <h1 className="forgot-password-title">Reset your password</h1>
        <p className="forgot-password-desc">
          Please provide the email address you used when you signed up for your
          Arabity account.
        </p>
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
