import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  return (
    <nav className="navbar">
      <ul>
        <Link to={"/"}>الرئيسية</Link>
        <Link>اتصل بنا</Link>
        {user?.isAdmin && <Link to={"/admin"}> صفحة المسؤول</Link>}
      </ul>
    </nav>
  );
}

export default Navbar;
