import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <Link to={"/"}>الرئيسية</Link>
        <Link>اتصل بنا</Link>
      </ul>
    </nav>
  );
}

export default Navbar;
