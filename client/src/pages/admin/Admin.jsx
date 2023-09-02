import "./admin.css";
import { useEffect, useState } from "react";
import Workshops from "./Workshops";
import Users from "./Users";
import Manage from "./Manage";
import Statistics from "./Statistics";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../redux/apiCalls/profileApiCall";
import Ratings from "./Ratings";
import { fetchWorkshopsCount } from "../../redux/apiCalls/mechanicApiCall";
import { useTranslation } from "react-i18next";

function Admin() {
  const [currentComponent, setCurrentComponent] = useState(1);

  const dispatch = useDispatch();
  const { workshopsCount } = useSelector((state) => state.workshopOwner);
  const { users } = useSelector((state) => state.profile);
  const { t } = useTranslation();
  document.title = t("admin_page_title");

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchWorkshopsCount());
  }, [dispatch]);

  return (
    <div className="admin">
      <div className="admin-sidebar">
        <div
          onClick={() => setCurrentComponent(1)}
          style={{ backgroundColor: currentComponent === 1 && "#ffd1d1da" }}
          className="admin-sidebar-component"
        >
          <p className="admin-sidebar-text">احصائيات</p>
        </div>

        <div
          onClick={() => setCurrentComponent(2)}
          style={{ backgroundColor: currentComponent === 2 && "#ffd1d1da" }}
          className="admin-sidebar-component"
        >
          <p className="admin-sidebar-text">الورش</p>
        </div>

        <div
          onClick={() => setCurrentComponent(3)}
          style={{ backgroundColor: currentComponent === 3 && "#ffd1d1da" }}
          className="admin-sidebar-component"
        >
          <p className="admin-sidebar-text">المستخدمين</p>
        </div>

        <div
          onClick={() => setCurrentComponent(4)}
          style={{ backgroundColor: currentComponent === 4 && "#ffd1d1da" }}
          className="admin-sidebar-component"
        >
          <p className="admin-sidebar-text">التقييمات</p>
        </div>

        <div
          onClick={() => setCurrentComponent(5)}
          style={{ backgroundColor: currentComponent === 5 && "#ffd1d1da" }}
          className="admin-sidebar-component"
        >
          <p className="admin-sidebar-text">ادارة</p>
        </div>
      </div>
      <div className="admin-dashboard">
        {currentComponent === 1 ? (
          <Statistics
            usersNumber={users.length}
            workshopsNumber={workshopsCount}
          />
        ) : currentComponent === 2 ? (
          <Workshops />
        ) : currentComponent === 3 ? (
          <Users users={users} />
        ) : currentComponent === 4 ? (
          <Ratings />
        ) : (
          <Manage />
        )}
      </div>
    </div>
  );
}

export default Admin;
