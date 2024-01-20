import HighlightOffIcon from "@mui/icons-material/HighlightOff";
function SearchSidebar({
  params,
  service,
  services,
  setService,
  province,
  provinces,
  setProvince,
  setPage,
  car,
  cars,
  setCar,
  t,
  resetFormHandler,
  lang,
}) {
  return (
    <div className="search-results-sidebar">
      <div className="search-results-sidebar-wrapper">
        <h4>{t("search_edit")}</h4>
        <form className="search-results-form">
          <div className="select-wrapper">
            <select
              value={service?._id ? JSON.stringify(service) : ""}
              onChange={(e) => {
                setService(JSON.parse(e.target.value));
                setPage(1);
                params.set("service", JSON.parse(e.target.value).value);
              }}
              className="siderbar-select"
            >
              <option value={""} disabled>
                {t("service_select")}
              </option>
              {services.map((service) => (
                <option
                  key={service.value}
                  value={JSON.stringify({
                    value: service.value,
                    _id: service._id,
                  })}
                >
                  {service.label[lang]}
                </option>
              ))}
            </select>
            {service?._id && (
              <HighlightOffIcon
                sx={{
                  color: "red",
                  cursor: "pointer",
                }}
                onClick={() => setService(null)}
              />
            )}
          </div>
          <div className="select-wrapper">
            <select
              value={car?._id ? JSON.stringify(car) : ""}
              onChange={(e) => {
                setCar(JSON.parse(e.target.value));
                setPage(1);
                params.set("car", JSON.parse(e.target.value).value);
              }}
              className="siderbar-select"
            >
              <option value={""} disabled>
                {t("car_select")}
              </option>
              {cars.map((car) => (
                <option
                  key={car.value}
                  value={JSON.stringify({
                    value: car.value,
                    _id: car._id,
                  })}
                >
                  {car.label[lang]}
                </option>
              ))}
            </select>
            {car?._id && (
              <HighlightOffIcon
                sx={{
                  color: "red",
                  cursor: "pointer",
                }}
                onClick={() => setCar(null)}
              />
            )}
          </div>

          <div className="select-wrapper">
            <select
              value={province?._id ? JSON.stringify(province) : ""}
              onChange={(e) => {
                setProvince(JSON.parse(e.target.value));
                setPage(1);
                params.set("province", JSON.parse(e.target.value).value);
              }}
              className="siderbar-select"
            >
              <option value={""} disabled>
                {t("province_select")}
              </option>
              {provinces.map((province) => (
                <option
                  key={province.value}
                  value={JSON.stringify({
                    value: province.value,
                    _id: province._id,
                  })}
                >
                  {province.label[lang]}
                </option>
              ))}
            </select>
            {province?._id && (
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
