import { useEffect, useState } from "react";
import { fetchWorkshops } from "../../redux/apiCalls/searchApiCall";
import SearchItem from "./SearchItem";
import "./search.css";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/joy/CircularProgress";
import { useLocation, useSearchParams } from "react-router-dom";
// import Pagination from "../../components/pagination/Pagination";
import { useTranslation } from "react-i18next";
import SearchSidebar from "./SearchSidebar";
import { Pagination } from "@mui/material";
import { fetchControls } from "../../redux/apiCalls/controlsApiCalls";

function SearchResults() {
  const { searchResults, loading, searchResultsCount } = useSelector(
    (state) => state.search
  );
  const { services, provinces, cars } = useSelector((state) => state.controls);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const [service, setService] = useState(
    location.state?.service || { value: "", _id: "" }
  );
  const [car, setCar] = useState(location.state?.car || { value: "", _id: "" });
  const [province, setProvince] = useState(
    location.state?.province || { value: "", _id: "" }
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const { t, i18n } = useTranslation();
  document.title = t("search_page_title");

  const RESULTS_PER_PAGE = 10;
  const pages = Math.ceil((searchResultsCount ?? 0) / RESULTS_PER_PAGE);
  const resetFormHandler = (e) => {
    e.preventDefault();
    setService({ value: "", _id: "" });
    setCar({ value: "", _id: "" });
    setProvince({ value: "", _id: "" });
    setPage(1);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);
  useEffect(() => {
    dispatch(fetchControls());
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    dispatch(
      fetchWorkshops(
        car?._id || "",
        service?._id || "",
        province?._id || "",
        page || null
      )
    );
  }, [dispatch, car, service, province, page]);

  useEffect(() => {
    setSearchParams(
      {
        service: service?.value || "",
        car: car?.value || "",
        province: province?.value || "",
        page: page,
      },
      { relative: "route", replace: true }
    );
  }, [searchParams, service, car, province, page]);

  return (
    <div
      className="search-results"
      style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
    >
      <div className="container">
        <div className="search-results-wrapper">
          <SearchSidebar
            params={params}
            service={service}
            services={services}
            setService={setService}
            province={province}
            provinces={provinces}
            setProvince={setProvince}
            setPage={setPage}
            car={car}
            cars={cars}
            setCar={setCar}
            t={t}
            resetFormHandler={resetFormHandler}
            lang={i18n.language}
          />

          <div className="search-results-main">
            {!loading && (
              <p className="search-results-count">
                {t("search_results")} {searchResultsCount}
              </p>
            )}
            <div className="search-results-main-items">
              {loading ? (
                <div className="loading-page">
                  <CircularProgress color="primary" />
                </div>
              ) : searchResults.length ? (
                searchResults.map((item) => (
                  <SearchItem key={item.id} item={item} />
                ))
              ) : (
                <p className="no-results-found">{t("no_results")}</p>
              )}
            </div>
            {!loading && (
              <Pagination
                style={{
                  direction: "ltr",
                  alignSelf: "center",
                  padding: "10px 0px",
                }}
                count={pages}
                variant="outlined"
                shape="rounded"
                page={page}
                onChange={(e, value) => {
                  setPage(value);
                }}
              />
            )}
            {/* <Pagination page={page} setPage={setPage} pages={pages} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
