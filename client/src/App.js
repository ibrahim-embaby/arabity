import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import { ToastContainer } from "react-toastify";
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

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Suspense fallback={null}>
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
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route
          path="/profile/:id/settings"
          element={
            user ? (
              user.workshopName ? (
                <MechanicSettings />
              ) : (
                <UserProfileSettings />
              )
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route path="/search/workshops" element={<SearchResults />} />
        <Route path="/mechanic/profile/:id" element={<MechanicProfile />} />
        <Route path="/posts" element={<Posts />} />
        <Route
          path="/conversations"
          element={user ? <Conversations /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/message/:conversationId"
          element={user ? <Message /> : <Navigate to={"/login"} />}
        />
        <Route path="/about-us" element={<ContactUs />} />
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
    </Suspense>
  );
}

export default App;

// NOTES FOR PERFORMANCE
/*
Here are some ways to minimize the size of your React app bundle:

    - Minify the code - This compresses the bundle by removing whitespace, comments, and other unnecessary syntax. You can do this with tools like Babel minify or UglifyJS.
    - Tree shaking - This removes unused imports from your modules, especially third party libraries. This can be done with webpack and Babel.
    - Code splitting - Split your bundle into smaller chunks, and lazy load routes and components as needed. This can significantly reduce the initial load size. You can do this with React.lazy() and Suspense.
    - Optimize images - Compress and optimize images to reduce their file size, which will reduce the overall bundle size.
    - Avoid unused imports - Make sure to audit your imports and remove any that are not actually used in your code.
    - Use lightweight packages - Where possible, choose smaller alternative libraries over larger ones.
    - Send Javascript files as compressed - Compress JS files sent to the browser using gzip compression. This is enabled by default in most servers.
    - Enable long term caching - Use cache-control headers so that browsers cache your bundle for a long time. This avoids unnecessary downloads.
    - Configure webpack optimizations - Enable webpack optimizations like concatenateModules, dedupe, and uglifyjs-webpack-plugin.
    - Split large libraries into separate bundles - Large libraries like React, Lodash, Moment can be split into their own chunks to reduce the main bundle size.
*/
