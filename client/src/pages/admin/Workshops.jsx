import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkshops } from "../../redux/apiCalls/searchApiCall";
import { deleteWorkshop } from "../../redux/apiCalls/workshopOwnerApiCall";

function Workshops() {
  const dispatch = useDispatch();
  const { searchResults, loading } = useSelector((state) => state.search);
  useEffect(() => {
    dispatch(fetchWorkshops());
  }, [dispatch]);

  const deleteWorkshopHandler = (id) => {
    dispatch(deleteWorkshop(id));
  };
  return !loading && searchResults.length > 0 ? (
    <div className="workshops-panel">
      <table className="workshops-table">
        <thead className="workshops-table-header">
          <tr className="workshops-table-header-row">
            <th className="workshops-table-header-item">id</th>
            <th className="workshops-table-header-item">name</th>
            <th className="workshops-table-header-item">options</th>
          </tr>
        </thead>
        <tbody className="workshops-table-body">
          {searchResults?.map((res) => (
            <tr key={res._id} className="workshops-table-body-row">
              <td className="workshops-table-body-item">{res._id}</td>
              <td className="workshops-table-body-item">{res.workshopName}</td>
              <td className="workshops-table-body-item">
                <button
                  className="workshops-delete-button"
                  onClick={() => deleteWorkshopHandler(res._id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>لا توجد نتائج</p>
  );
}

export default Workshops;
