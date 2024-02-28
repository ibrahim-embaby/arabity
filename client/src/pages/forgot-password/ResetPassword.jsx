import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/apiCalls/authApiCall";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useTranslation } from "react-i18next";

function ResetPassword() {
  const dispatch = useDispatch();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!newPassword) return toast.error("password is required");
    dispatch(resetPassword(token, newPassword));
    setNewPassword("");
  };
  const { t } = useTranslation();

  return (
    <div className="reset-password">
      <form onSubmit={handleResetPassword} className="reset-password-form">
        <h1>Password Reset</h1>
        <p>Enter your new password.</p>
        <div className="reset-password-input-wrapper">
          <input
            type={passwordVisible ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="reset-password-input"
            min={5}
          />
          {passwordVisible ? (
            <VisibilityOffIcon
              className="password-visibility-icon"
              onClick={() => setPasswordVisible(false)}
            />
          ) : (
            <VisibilityIcon
              className="password-visibility-icon"
              onClick={() => setPasswordVisible(true)}
            />
          )}
        </div>
        <button className="reset-password-btn">{t("confirm")}</button>
      </form>
    </div>
  );
}

export default ResetPassword;
