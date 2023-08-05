import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkshops } from "../../redux/apiCalls/searchApiCall";
// import { deleteWorkshop } from "../../redux/apiCalls/workshopOwnerApiCall";
// import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";
import EnhancedTable from "../../components/enhanced-table/EnhancedTable";

// const columns = [
//   { field: "id", headerName: "ID", width: 70 },
//   { field: "firstName", headerName: "First name", width: 130 },
//   { field: "lastName", headerName: "Last name", width: 130 },
//   {
//     field: "age",
//     headerName: "Age",
//     type: "number",
//     width: 90,
//   },
//   {
//     field: "fullName",
//     headerName: "Full name",
//     description: "This column has a value getter and is not sortable.",
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//   },
// ];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

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
    <div
      className="loading-page"
      style={{
        minHeight: "calc(100vh - var(--difference-value))",
      }}
    >
      <CircularProgress color="primary" />
    </div>
  ) : searchResults.length > 0 ? (
    <div className="workshops-panel">
      <EnhancedTable data={searchResults} title={"الورش"} />
      {/* <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      /> */}
      {/* <table className="workshops-table">
        <thead className="workshops-table-header">
          <tr className="workshops-table-header-row">
            <th className="workshops-table-header-item">المعرف</th>
            <th className="workshops-table-header-item">اسم الورشة</th>
            <th className="workshops-table-header-item">خيارات</th>
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
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  ) : (
    <p>لا توجد نتائج</p>
  );
}

export default Workshops;
