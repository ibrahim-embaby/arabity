import HighlightOffIcon from "@mui/icons-material/HighlightOff";
function SearchSidebar({
  params,
  service,
  services,
  setService,
  province,
  provinces,
  setProvince,
  car,
  cars,
  setCar,
  t,
  resetFormHandler,
}) {
  return (
    <div className="search-results-sidebar">
      <div className="search-results-sidebar-wrapper">
        <h4>{t("search_edit")}</h4>
        <form className="search-results-form">
          <div className="select-wrapper">
            <select
              value={service}
              onChange={(e) => {
                setService(e.target.value);
                params.set("service", e.target.value);
              }}
              className="siderbar-select"
            >
              <option value={""} disabled>
                {t("service_select")}
              </option>
              {services.map((service) => (
                <option key={service.value} value={service.label}>
                  {service.label}
                </option>
              ))}
            </select>
            {service && (
              <HighlightOffIcon
                sx={{
                  color: "red",
                  cursor: "pointer",
                }}
                onClick={() => setService("")}
              />
            )}
          </div>
          <div className="select-wrapper">
            <select
              value={car}
              onChange={(e) => {
                setCar(e.target.value);
                params.set("car", e.target.value);
              }}
              className="siderbar-select"
            >
              <option value={""} disabled>
                {t("car_select")}
              </option>
              {cars.map((car) => (
                <option key={car.value} value={car.value}>
                  {car.label}
                </option>
              ))}
            </select>
            {car && (
              <HighlightOffIcon
                sx={{
                  color: "red",
                  cursor: "pointer",
                }}
                onClick={() => setCar("")}
              />
            )}
          </div>

          <div className="select-wrapper">
            <select
              value={province}
              onChange={(e) => {
                setProvince(e.target.value);
                params.set("province", e.target.value);
              }}
              className="siderbar-select"
            >
              <option value={""} disabled>
                {t("province_select")}
              </option>
              {provinces.map((province) => (
                <option key={province.name} value={province.name}>
                  {province.name}
                </option>
              ))}
            </select>
            {province && (
              <HighlightOffIcon
                sx={{
                  color: "red",
                  cursor: "pointer",
                }}
                onClick={() => setProvince("")}
              />
            )}
          </div>

          <button
            className="search-results-form-btn"
            onClick={resetFormHandler}
          >
            {t("reset_inputs")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchSidebar;
