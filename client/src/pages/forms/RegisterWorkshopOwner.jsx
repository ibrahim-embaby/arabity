import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import { useState } from "react";
import { toast } from "react-toastify";

function RegisterWorkshopOwner() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const registerFormHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "") return toast.error("username is empty");
    if (email.trim() === "") return toast.error("email is empty");
    if (mobile.trim() === "") return toast.error("mobile is empty");
    if (password.trim() === "") return toast.error("password is empty");
    dispatch(
      registerUser({
        email,
        mobile,
        password,
        username,
      })
    );
  };
  return (
    <div className="register">
      <form className="register-form" onSubmit={registerFormHandler}>
        <label htmlFor="username">الاسم</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">البريد الإلكتروني</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="mobile">رقم الموبايل</label>
        <input
          type="text"
          id="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <label htmlFor="password">كلمة المرور</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">تسجيل</button>
      </form>
    </div>
  );
}

export default RegisterWorkshopOwner;
