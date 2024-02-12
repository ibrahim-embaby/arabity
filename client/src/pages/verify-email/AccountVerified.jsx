import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../../redux/apiCalls/authApiCall";
import CircularProgress from "@mui/joy/CircularProgress";

function AccountVerified() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(verifyEmail(token));
  }, [token]);
  return loading ? (
    <div
      className="loading-page"
      style={{
        minHeight: "calc(100vh - var(--difference-value))",
      }}
    >
      <CircularProgress color="primary" />
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
}

export default AccountVerified;
