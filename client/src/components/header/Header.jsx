import { useState } from "react";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import Navbar from "./Navbar";
import "./header.css";
import { useLocation } from "react-router-dom";

function Header() {
  const [toggle, setToggle] = useState(false);
  const location = useLocation();

  return (
    <div
      className={
        location.pathname.startsWith("/message") ? "header" : "fixed-header"
      }
    >
      <HeaderLeft />
      <Navbar toggle={toggle} setToggle={setToggle} />
      <HeaderRight toggle={toggle} setToggle={setToggle} />
    </div>
  );
}

export default Header;
