import React, { useState } from "react";
import "./tag-input.css";

const TagInput = () => {
  const [values, setValues] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;

    // Check if the user pressed the Enter key
    if (event.key === "Enter" && value.trim()) {
      setValues([...values, value.trim()]);
      event.target.value = "";
    }
  };

  const handleRemoveValue = (index) => {
    setValues(values.filter((value, i) => i !== index));
  };

  return (
    <div className="tag-input">
      <ul className="tag-list">
        {values.map((value, index) => (
          <li key={index} className="tag">
            {value}
            <button
              className="remove-button"
              onClick={() => handleRemoveValue(index)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <input
        className="input-field"
        type="text"
        placeholder="Add a value"
        onKeyDown={handleInputChange}
      />
    </div>
  );
};

export default TagInput;
