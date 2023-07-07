import React, { useState } from "react";

const provinces = [
  { name: "Alberta", cities: ["Calgary", "Edmonton", "Red Deer"] },
  { name: "British Columbia", cities: ["Vancouver", "Victoria", "Kelowna"] },
  { name: "Ontario", cities: ["Toronto", "Ottawa", "Hamilton"] },
  { name: "Quebec", cities: ["Montreal", "Quebec City", "Gatineau"] },
];

function AddressInput({ index, address, onAddressChange, canRemove }) {
  const handleProvinceChange = (event) => {
    const { value } = event.target;
    const province = provinces.find((province) => province.name === value);
    const cities = province ? province.cities : [];
    onAddressChange(index, { ...address, province: value, city: "", cities });
  };

  const handleCityChange = (event) => {
    const { value } = event.target;
    onAddressChange(index, { ...address, city: value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onAddressChange(index, { ...address, [name]: value });
  };

  const handleRemoveClick = () => {
    if (canRemove) {
      onAddressChange(index, null);
    }
  };

  return (
    <div>
      <label>
        Street Address:
        <input
          type="text"
          name="street"
          value={address.street}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Province:
        <select
          name="province"
          value={address.province}
          onChange={handleProvinceChange}
          required
        >
          <option value="">-- Select Province --</option>
          {provinces.map((province) => (
            <option key={province.name} value={province.name}>
              {province.name}
            </option>
          ))}
        </select>
      </label>

      {address.cities.length > 0 && (
        <label>
          City:
          <select
            name="city"
            value={address.city}
            onChange={handleCityChange}
            required
          >
            <option value="">-- Select City --</option>
            {address.cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>
      )}

      <label>
        Postal Code:
        <input
          type="text"
          name="postalCode"
          value={address.postalCode}
          onChange={handleInputChange}
          required
        />
      </label>

      {canRemove && (
        <button type="button" onClick={handleRemoveClick}>
          Remove Address
        </button>
      )}
    </div>
  );
}

function AddressForm() {
  const [addresses, setAddresses] = useState([
    { street: "", province: "", city: "", cities: [], postalCode: "" },
  ]);

  const handleAddressChange = (index, newAddress) => {
    const newAddresses = [...addresses];
    newAddresses[index] = newAddress;
    // Remove null addresses
    const filteredAddresses = newAddresses.filter(
      (address) => address !== null
    );
    // Ensure at least one address input group is always present
    if (filteredAddresses.length === 0) {
      filteredAddresses.push({
        street: "",
        province: "",
        city: "",
        cities: [],
        postalCode: "",
      });
    }
    setAddresses(filteredAddresses);
  };

  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      { street: "", province: "", city: "", cities: [], postalCode: "" },
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };

  return (
    <form onSubmit={handleSubmit}>
      {addresses.map((address, index) => (
        <AddressInput
          key={index}
          index={index}
          address={address}
          onAddressChange={handleAddressChange}
          canRemove={addresses.length > 1 || address !== null}
        />
      ))}

      <button type="button" onClick={handleAddAddress}>
        Add Address
      </button>

      <button type="submit">Submit</button>
    </form>
  );
}

export default AddressForm;
