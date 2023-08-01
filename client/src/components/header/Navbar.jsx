import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const [currentTab, setCurrentTab] = useState(1);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentTab(1);
    } else if (location.pathname === "/contact-us") {
      setCurrentTab(2);
    } else if (location.pathname === "/admin") {
      setCurrentTab(3);
    } else {
      setCurrentTab(0);
    }
  }, [location.pathname, currentTab]);
  return (
    <nav className="navbar">
      <ul>
        <Link
          to={"/"}
          onClick={() => setCurrentTab(1)}
          style={{
            backgroundColor: currentTab === 1 && "#292b2c",
            color: currentTab === 1 && "white",
          }}
        >
          الرئيسية
        </Link>
        <Link
          onClick={() => setCurrentTab(2)}
          style={{
            backgroundColor: currentTab === 2 && "#292b2c",
            color: currentTab === 2 && "white",
          }}
          to={"/contact-us"}
        >
          اتصل بنا
        </Link>
        {user?.isAdmin && (
          <Link
            to={"/admin"}
            onClick={() => setCurrentTab(3)}
            style={{
              backgroundColor: currentTab === 3 && "#292b2c",
              color: currentTab === 3 && "white",
            }}
          >
            صفحة المسؤول
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
