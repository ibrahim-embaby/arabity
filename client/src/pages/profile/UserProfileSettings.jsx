import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../redux/apiCalls/profileApiCall";
function UserProfileSettings() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const dispatch = useDispatch();

  const handleUserSettingsForm = (e) => {
    e.preventDefault();
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
    <div className="user-profile-settings">
      <form
        onSubmit={handleUserSettingsForm}
        className="user-profile-settings-form"
      >
        <div className="user-profile-settings-form-wrapper">
          <div className="user-profile-settings-form-labels">
            <label>تغيير الإسم</label>
            <label>تغيير كلمة المرور</label>
            <label>تغيير رقم الهاتف</label>
          </div>

          <div className="user-profile-settings-form-inputs">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="اكتب اسمك"
              className="user-profile-settings-form-item-input"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="كلمة المرور"
              className="user-profile-settings-form-item-input"
            />
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              type="text"
              placeholder="رقم الهاتف"
              className="user-profile-settings-form-item-input"
            />
          </div>
        </div>

        <button type="submit" className="user-profile-settings-form-btn">
          تعديل
        </button>
      </form>
    </div>
  );
}

export default UserProfileSettings;
