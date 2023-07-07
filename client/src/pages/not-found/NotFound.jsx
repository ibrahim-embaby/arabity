import "./not-found.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <p className="not-found-text">هذه الصفحة غير موجودة </p>
      <p>
        العودة إلي <Link to={"/"}>الصفحة الرئيسية</Link>
      </p>
    </div>
  );
}

export default NotFound;
