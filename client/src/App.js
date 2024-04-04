import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import { useSelector } from "react-redux";
import UserProfile from "./pages/profile/UserProfile";
import SearchResults from "./pages/search/SearchResults";
import MechanicProfile from "./pages/profile/MechanicProfile";
import UserProfileSettings from "./pages/profile/UserSettings";
import Message from "./pages/message/Message";
import NotFound from "./pages/not-found/NotFound";
import Admin from "./pages/admin/Admin";
import Conversations from "./pages/conversations/Conversations";
import ContactUs from "./pages/contact-us/ContactUs";
import MechanicSettings from "./pages/profile/MechanicSettings";
import "./i18n";
import Posts from "./pages/posts/Posts";
import AccountVerified from "./pages/verify-email/AccountVerified";
import VerifyAccount from "./pages/verify-email/VerifyAccount";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import ResetPassword from "./pages/forgot-password/ResetPassword";
import { Toaster } from "sonner";
import { useTranslation } from "react-i18next";

function Toast() {
  const { i18n } = useTranslation();

  return (
    <Toaster
      position={i18n.language === "ar" ? "bottom-right" : "bottom-left"}
      richColors
      duration={1500}
      dir={i18n.language === "ar" && "rtl"}
    />
  );
}
function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Suspense fallback={null}>
      <Toast />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            user && !user.isAccountVerified ? <VerifyAccount /> : <Home />
          }
        />
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to={"/"} /> : <Register />}
        />
        <Route
          path="/profile/:id"
          element={
            user && user.isAccountVerified ? (
              <UserProfile />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/profile/:id/settings"
          element={
            user && user.isAccountVerified ? (
              user.workshopName ? (
                <MechanicSettings />
              ) : (
                <UserProfileSettings />
              )
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route path="/search/workshops" element={<SearchResults />} />
        <Route
          path="/mechanic/profile/:id"
          element={
            user && !user.isAccountVerified ? (
              <VerifyAccount />
            ) : (
              <MechanicProfile />
            )
          }
        />
        <Route
          path="/posts"
          element={
            user && !user.isAccountVerified ? <Navigate to={"/"} /> : <Posts />
          }
        />
        <Route
          path="/conversations"
          element={
            user && user.isAccountVerified ? (
              <Conversations />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/message/:conversationId"
          element={
            user && user.isAccountVerified ? <Message /> : <Navigate to={"/"} />
          }
        />
        <Route path="/about-us" element={<ContactUs />} />
        <Route
          path="/account/activate/:userType/:token"
          element={<AccountVerified />}
        />
        <Route
          path="/forgot-password"
          element={user ? <Navigate to={"/"} /> : <ForgotPassword />}
        />
        <Route
          path="/reset-password/:token"
          element={!user ? <ResetPassword /> : <Navigate to={"/"} />}
        />
        <Route
          path="/admin"
          element={
            user?.isAdmin ? (
              <Admin />
            ) : user ? (
              <Navigate to={"/"} />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route path="*(!(sitemap.txt))" element={<NotFound />} />
      </Routes>
      <Footer />
    </Suspense>
  );
}

export default App;
