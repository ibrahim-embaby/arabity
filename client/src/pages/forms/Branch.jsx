import { useTranslation } from "react-i18next";
import { provinces } from "../../dummyData";

function Branch({ index, branch, onBranchChange, canRemove }) {
  const handleProvinceChange = (event) => {
    const { value } = event.target;
    const province = provinces.find((province) => province.name === value);
    const cities = province ? province.cities : [];
    onBranchChange(index, {
      ...branch,
      branchProvince: value,
      branchCity: "",
      cities,
    });
  };

  const { t } = useTranslation();

  const handleCityChange = (event) => {
    const { value } = event.target;
    onBranchChange(index, { ...branch, branchCity: value });
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
          value={branch.branchProvince}
          onChange={handleProvinceChange}
          required
        >
          <option value="">{t("choose_province")}</option>
          {provinces.map((province) => (
            <option key={province.name} value={province.name}>
              {province.name}
            </option>
          ))}
        </select>
      </label>

      {branch.cities.length > 0 && (
        <label className="workshop-city branch-item">
          {t("register_workshop_city")}
          <select
            name={`city${index}`}
            value={branch.branchCity}
            onChange={handleCityChange}
            required
          >
            <option value="">{t("choose_city")}</option>
            {branch.cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="workshop-address branch-item">
        {t("register_workshop_address")}
        <input
          type="text"
          name={`branchAddress`}
          value={branch.branchAddress}
          onChange={handleInputChange}
          required
        />
      </label>

      <label className="workshop-mobile branch-item">
        {t("register_workshop_mobile")}
        <input
          type="text"
          name={`branchMobile`}
          value={branch.branchMobile}
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
