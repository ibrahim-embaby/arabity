import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkshops } from "../../redux/apiCalls/searchApiCall";
// import { deleteWorkshop } from "../../redux/apiCalls/workshopOwnerApiCall";
import EnhancedTable from "../../components/enhanced-table/EnhancedTable";
import { Loading } from "../../components/loading/Loading";
import { fetchWorkshopsCount } from "../../redux/apiCalls/mechanicApiCall";

function Workshops() {
  const dispatch = useDispatch();
  const { searchResults, loading } = useSelector((state) => state.search);
  const { workshopsCount } = useSelector((state) => state.mechanic);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(fetchWorkshopsCount());
  }, []);
  useEffect(() => {
    dispatch(fetchWorkshops("", "", "", currentPage));
  }, [currentPage]);

  return loading ? (
    <Loading />
  ) : searchResults?.length > 0 ? (
    <div className="workshops-panel">
      <EnhancedTable
        data={searchResults}
        title={"الورش"}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        workshopsCount={workshopsCount}
      />
    </div>
  ) : (
    <p>لا توجد نتائج</p>
  );
}

export default Workshops;
