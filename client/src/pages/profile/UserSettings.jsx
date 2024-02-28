import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../redux/apiCalls/profileApiCall";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
function UserProfileSettings() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const handleUserSettingsForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {};

    if (formData.get("username")) {
      data.username = formData.get("username");
    }

    if (formData.get("password")) {
      if (formData.get("password").length < 5)
        return toast.error("password can't be less than 5 characters");
      data.password = formData.get("password");
    }

    if (formData.get("mobile")) {
      data.mobile = formData.get("mobile");
    }

    if (Object.keys(data).length) {
      dispatch(updateUserProfile(data));
    } else {
      toast.warn(t("edit_one_field_at_least"));
    }
  };

  return (
    <div
      className="user-profile-settings"
      style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
    >
      <Helmet>
        <title>{t("user_settings_page_title")}</title>
        <meta
          name="description"
          content="Arabity - User Settings Page, this is your settings page, you can edit your username, password, and mobile number"
        />
      </Helmet>
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
              name="username"
              type="text"
              placeholder={t("user_settings_name_placeholder")}
              className="user-profile-settings-form-item-input"
            />
            <input
              name="password"
              type="password"
              placeholder={t("password")}
              className="user-profile-settings-form-item-input"
            />
            <input
              name="mobile"
              type="text"
              placeholder={t("user_settings_mobile_placeholder")}
              className="user-profile-settings-form-item-input"
            />
          </div>
        </div>

        <button className="user-profile-settings-form-btn">
          {t("user_settings_edit")}
        </button>
      </form>
    </div>
  );
}

export default UserProfileSettings;
