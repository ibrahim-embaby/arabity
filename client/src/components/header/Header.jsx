import { useState } from "react";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import Navbar from "./Navbar";
import "./header.css";

function Header() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="header">
      <HeaderLeft />
      <Navbar toggle={toggle} setToggle={setToggle} />
      <HeaderRight toggle={toggle} setToggle={setToggle} />
    </div>
  );
}

export default Header;
