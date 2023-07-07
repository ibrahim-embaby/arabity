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
    <div>
      <label>
        المحافظة
        <select
          name={`province${index}`}
          value={branch.branchProvince}
          onChange={handleProvinceChange}
          required
        >
          <option value="">-- اختر المحافظة --</option>
          {provinces.map((province) => (
            <option key={province.name} value={province.name}>
              {province.name}
            </option>
          ))}
        </select>
      </label>

      {branch.cities.length > 0 && (
        <label>
          المدينة
          <select
            name={`city${index}`}
            value={branch.branchCity}
            onChange={handleCityChange}
            required
          >
            <option value="">-- اختر المدينة --</option>
            {branch.cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>
      )}

      <label>
        العنوان التفصيلي:
        <input
          type="text"
          name={`branchAddress`}
          value={branch.branchAddress}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        موبايل الفرع
        <input
          type="text"
          name={`branchMobile`}
          value={branch.branchMobile}
          onChange={handleInputChange}
          required
        />
      </label>

      {canRemove && (
        <button type="button" onClick={handleRemoveClick}>
          احذف الفرع
        </button>
      )}
    </div>
  );
}

export default Branch;
