import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Profile from "./pages/profile/Profile";
import SearchResults from "./pages/search/SearchResults";
import WorkshopProfile from "./pages/profile/WorkshopProfile";
import UserProfileSettings from "./pages/profile/UserProfileSettings";
import Message from "./pages/message/Message";
import NotFound from "./pages/not-found/NotFound";
import Admin from "./pages/admin/Admin";
import Conversations from "./pages/conversations/Conversations";
import ContactUs from "./pages/contact-us/ContactUs";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <ToastContainer theme="colored" position="top-center" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to={"/"} /> : <Register />}
        />
        <Route path="/profile/:id" element={<Profile />} />
        <Route
          path="/profile/:id/settings"
          element={user ? <UserProfileSettings /> : <Navigate to={"/login"} />}
        />
        <Route path="/search/workshops" element={<SearchResults />} />
        <Route
          path="/workshop-owner/profile/:id"
          element={<WorkshopProfile />}
        />
        <Route
          path="/conversations"
          element={user ? <Conversations /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/message/:conversationId"
          element={user ? <Message /> : <Navigate to={"/login"} />}
        />
        <Route path="/contact-us" element={<ContactUs />} />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
