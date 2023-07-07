import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import Navbar from "./Navbar";
import "./header.css";

function Header() {
  return (
    <div className="header">
      <HeaderLeft />
      <Navbar />
      <HeaderRight />
    </div>
  );
}

export default Header;
