import "./admin.css";
import { useEffect, useState } from "react";
import Workshops from "./Workshops";
import Users from "./Users";
import Manage from "./Manage";
import Statistics from "./Statistics";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../redux/apiCalls/profileApiCall";
import { fetchAllWorkshops } from "../../redux/apiCalls/searchApiCall";
import Ratings from "./Ratings";

function Admin() {
  const [currentComponent, setCurrentComponent] = useState(1);

  const dispatch = useDispatch();
  const { searchResults, loading } = useSelector((state) => state.search);
  const { users } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllWorkshops());
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
            workshopsNumber={searchResults.length}
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
