import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../redux/apiCalls/profileApiCall";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
function UserProfileSettings() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  document.title = t("user_settings_page_title");

  const handleUserSettingsForm = (e) => {
    e.preventDefault();
    if (!username && !password && !mobile) {
      return toast.warn(t("edit_one_field_at_least"));
    }
    const userInfo = {
      username,
      password,
      mobile,
    };

    dispatch(updateUserProfile(userInfo));

    setUsername("");
    setPassword("");
    setMobile("");
  };

  return (
    <div
      className="user-profile-settings"
      style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
    >
      <form
        onSubmit={handleUserSettingsForm}
        className="user-profile-settings-form"
      >
        <div className="user-profile-settings-form-wrapper">
          <div className="user-profile-settings-form-labels">
            <label> {t("user_settings_name")}</label>
            <label>{t("user_settings_password")}</label>
            <label>{t("user_settings_mobile")}</label>
          </div>

          <div className="user-profile-settings-form-inputs">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder={t("user_settings_name_placeholder")}
              className="user-profile-settings-form-item-input"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder={t("password")}
              className="user-profile-settings-form-item-input"
            />
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              type="text"
              placeholder={t("user_settings_mobile_placeholder")}
              className="user-profile-settings-form-item-input"
            />
          </div>
        </div>

        <button type="submit" className="user-profile-settings-form-btn">
          {t("user_settings_edit")}
        </button>
      </form>
    </div>
  );
}

export default UserProfileSettings;
