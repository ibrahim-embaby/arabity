import "./account-verification.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { sendVerificationMail } from "../../redux/apiCalls/authApiCall";

function VerifyAccount() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const sendAnotherVerificationMail = () => {
    dispatch(sendVerificationMail(user?.email));
  };
  return user?.isAccountVerified ? (
    <Navigate to={"/"} />
  ) : (
    <div className="verify-account">
      <p>please check your email and verify your account</p>
      <p
        onClick={sendAnotherVerificationMail}
        style={{ textDecoration: "underline", color: "red", cursor: "pointer" }}
      >
        send another verification link
      </p>
    </div>
  );
}

export default VerifyAccount;
