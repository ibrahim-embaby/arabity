import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkshops } from "../../redux/apiCalls/searchApiCall";
// import { deleteWorkshop } from "../../redux/apiCalls/workshopOwnerApiCall";
import EnhancedTable from "../../components/enhanced-table/EnhancedTable";
import { Loading } from "../../components/loading/Loading";

function Workshops() {
  const dispatch = useDispatch();
  const { searchResults, loading } = useSelector((state) => state.search);
  useEffect(() => {
    dispatch(fetchWorkshops());
  }, [dispatch]);

  // const deleteWorkshopHandler = (id) => {
  //   dispatch(deleteWorkshop(id));
  // };
  return loading ? (
    <Loading />
  ) : searchResults?.length > 0 ? (
    <div className="workshops-panel">
      <EnhancedTable data={searchResults} title={"الورش"} />
    </div>
  ) : (
    <p>لا توجد نتائج</p>
  );
}

export default Workshops;
