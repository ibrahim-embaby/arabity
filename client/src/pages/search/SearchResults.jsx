import { useState } from "react";
import { fetchAllWorkshops } from "../../redux/apiCalls/searchApiCall";
import SearchItem from "./SearchItem";
import "./search.css";
import { useDispatch, useSelector } from "react-redux";
import { cars, provinces, services } from "../../dummyData";
import CircularProgress from "@mui/joy/CircularProgress";

function SearchResults() {
  const { searchResults, loading } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [service, setService] = useState("");
  const [car, setCar] = useState("");
  const [province, setProvince] = useState("");
  const searchFormHandler = (e) => {
    e.preventDefault();
    dispatch(fetchAllWorkshops(car, service, province));
  };

  const resetFormHandler = (e) => {
    setService("");
    setCar("");
    setProvince("");
  };
  return (
    <div className="search-results">
      <div className="search-results-sidebar">
        <div className="search-results-sidebar-wrapper">
          <h4>تعديل البحث</h4>
          <form className="search-results-form" onSubmit={searchFormHandler}>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value={""} disabled>
                نوع الصيانة
              </option>
              {services.map((service) => (
                <option key={service.value} value={service.label}>
                  {service.label}
                </option>
              ))}
            </select>
            <select value={car} onChange={(e) => setCar(e.target.value)}>
              <option value={""} disabled>
                نوع العربية
              </option>
              {cars.map((car) => (
                <option key={car.value} value={car.value}>
                  {car.label}
                </option>
              ))}
            </select>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            >
              <option value={""} disabled>
                المحافظة
              </option>
              {provinces.map((province) => (
                <option key={province.name} value={province.name}>
                  {province.name}
                </option>
              ))}
            </select>
            <button className="search-results-form-btn" type="submit">
              بحث
            </button>
            <button
              className="search-results-form-btn"
              onClick={resetFormHandler}
            >
              تفريغ الحقول
            </button>
          </form>
        </div>
      </div>

      <div className="search-results-main">
        {loading ? (
          <div className="loading-page">
            <CircularProgress color="primary" />
          </div>
        ) : searchResults.length ? (
          searchResults.map((item) => <SearchItem key={item._id} item={item} />)
        ) : (
          <p className="no-results-found">لا توجد نتائج</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
