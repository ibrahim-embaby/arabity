import React, { useEffect } from "react";
import "./branch-list.css";
const BranchesList = ({ provinces, branches, setBranches, lang, t }) => {
  const initialBranch = {
    province: null,
    city: null,
    address: "",
    mobile: "",
  };
  useEffect(() => {
    if (branches.length) {
      setBranches(branches);
    } else {
      setBranches([initialBranch]);
    }
  }, []);

  const handleProvinceChange = (index, selectedProvince) => {
    const updatedBranches = [...branches];
    updatedBranches[index].province = selectedProvince;
    updatedBranches[index].city = null;
    setBranches(updatedBranches);
  };

  const handleCityChange = (index, selectedCity) => {
    const updatedBranches = [...branches];
    updatedBranches[index].city = selectedCity;
    setBranches(updatedBranches);
  };

  const handleInputChange = (index, fieldName, value) => {
    const updatedBranches = [...branches];
    updatedBranches[index][fieldName] = value;
    setBranches(updatedBranches);
  };

  const addBranch = () => {
    setBranches([...branches, initialBranch]);
  };

  const removeBranch = (index) => {
    if (branches.length > 1) {
      const updatedBranches = branches.filter((branch, i) => i !== index);
      setBranches(updatedBranches);
    }
  };
  return (
    <div className="branch-list">
      {branches.map((branch, index) => (
        <div key={index} className="branch">
          <div className="branch-details">
            <p>
              {t("branch")} {index + 1}
            </p>
            <label className="workshop-province branch-item">
              {t("register_workshop_province")}
              <select
                value={
                  (branch.province && JSON.stringify(branch.province)) || ""
                }
                onChange={(e) =>
                  handleProvinceChange(index, JSON.parse(e.target.value))
                }
                className="branch-province-select"
              >
                <option value="" disabled>
                  {t("choose_province")}
                </option>
                {provinces.map((province) => (
                  <option
                    key={province._id}
                    value={JSON.stringify({
                      label: province.label,
                      value: province.value,
                      cities: province.cities,
                      _id: province._id,
                    })}
                  >
                    {province.label[lang]}
                  </option>
                ))}
              </select>
            </label>

            {branch.province && (
              <label className="workshop-city branch-item">
                {t("register_workshop_city")}
                <select
                  value={(branch.city && JSON.stringify(branch.city)) || ""}
                  onChange={(e) =>
                    handleCityChange(index, JSON.parse(e.target.value))
                  }
                  className="branch-city-select"
                >
                  <option value="" disabled>
                    {t("choose_city")}
                  </option>
                  {provinces
                    .find(
                      (province) => province.value === branch.province.value
                    )
                    ?.cities.map((city) => (
                      <option
                        key={city._id}
                        value={JSON.stringify({
                          label: city.label,
                          value: city.value,
                          _id: city._id,
                        })}
                      >
                        {city.label[lang]}
                      </option>
                    ))}
                </select>
              </label>
            )}

            <label className="workshop-address branch-item">
              {t("register_workshop_address")}
              <input
                type="text"
                value={branch.address}
                onChange={(e) =>
                  handleInputChange(index, "address", e.target.value)
                }
                className="branch-address-input"
              />
            </label>

            <label className="workshop-mobile branch-item">
              {t("register_workshop_mobile")}
              <input
                type="text"
                value={branch.mobile}
                onChange={(e) =>
                  handleInputChange(index, "mobile", e.target.value)
                }
                className="branch-mobile-input"
              />
            </label>
          </div>
          {branches.length > 1 && (
            <span
              className="branch-btn branch-delete-btn"
              onClick={() => removeBranch(index)}
            >
              {t("register_workshop_delete_branch")}
            </span>
          )}
          <hr />
        </div>
      ))}

      <span className="branch-btn branch-add-btn" onClick={addBranch}>
        {t("register_workshop_add_branch")}
      </span>
    </div>
  );
};

export default BranchesList;
