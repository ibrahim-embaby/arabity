import { useTranslation } from "react-i18next";

function Branch({ index, branch, onBranchChange, canRemove, provinces, lang }) {
  const handleProvinceChange = (event) => {
    const { value } = event.target;
    const province = provinces.find((province) => province._id === value);

    const cities = province
      ? lang === "ar"
        ? province.cities.map((city) => {
            return { value: city.label.ar, _id: city._id };
          })
        : province.cities.map((city) => {
            return { value: city.label.en, _id: city._id };
          })
      : [];
    onBranchChange(index, {
      ...branch,
      province: value,
      city: "",
      cities,
    });
  };

  const { t } = useTranslation();

  const handleCityChange = (event) => {
    const { value } = event.target;
    onBranchChange(index, { ...branch, city: value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onBranchChange(index, { ...branch, [name]: value });
  };

  const handleRemoveClick = () => {
    if (canRemove) {
      onBranchChange(index, null);
    }
  };

  return (
    <div className="branch">
      <label className="workshop-province branch-item">
        {t("register_workshop_province")}
        <select
          name={`province${index}`}
          value={branch.province}
          onChange={handleProvinceChange}
          required
        >
          <option value="">{t("choose_province")}</option>
          {provinces.map((province) => (
            <option key={province._id} value={province._id}>
              {province.label[lang]}
            </option>
          ))}
        </select>
      </label>

      {branch.cities?.length > 0 && (
        <label className="workshop-city branch-item">
          {t("register_workshop_city")}
          <select
            name={`city${index}`}
            value={branch.city}
            onChange={handleCityChange}
            required
          >
            <option value="">{t("choose_city")}</option>
            {branch.cities.map((city, index) => (
              <option key={index} value={city._id}>
                {city.value}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="workshop-address branch-item">
        {t("register_workshop_address")}
        <input
          type="text"
          name={`address`}
          value={branch.address}
          onChange={handleInputChange}
          required
        />
      </label>

      <label className="workshop-mobile branch-item">
        {t("register_workshop_mobile")}
        <input
          type="text"
          name={`mobile`}
          value={branch.mobile}
          onChange={handleInputChange}
          required
        />
      </label>

      {canRemove && (
        <button
          className="branch-btn add-branch-btn"
          type="button"
          onClick={handleRemoveClick}
        >
          {t("register_workshop_delete_branch")}
        </button>
      )}
    </div>
  );
}

export default Branch;
