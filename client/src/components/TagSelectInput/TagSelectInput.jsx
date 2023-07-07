import { useState } from "react";
import Select from "react-select";
import "./TagSelectInput.css";
import SelectedTags from "./SelectedTags";

function TagSelectInput({
  selectedOptions,
  setSelectedOptions,
  options,
  placeholder,
}) {
  const [newTag, setNewTag] = useState("");
  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const handleRemoveTag = (tagToRemove) => {
    setSelectedOptions(
      selectedOptions.filter((tag) => tag.value !== tagToRemove.value)
    );
  };

  const customComponents = {
    MultiValueLabel: ({ children }) => null,
    MultiValueRemove: ({ innerProps }) => null,
  };
  return (
    <div className="tag-select-input-container">
      <Select
        options={options}
        value={selectedOptions}
        onChange={handleSelectChange}
        isMulti
        components={customComponents}
        className="tag-select-input"
        placeholder={placeholder}
      />
      <div className="tag-select-add-container">
        <input
          type="text"
          placeholder="أضف خدمة أخري"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="tag-select-add-input"
        />
        <button
          onClick={() => {
            if (newTag !== "") {
              setSelectedOptions([
                ...selectedOptions,
                { value: newTag, label: newTag },
              ]);
              setNewTag("");
            }
          }}
          type="button"
          className="tag-select-add-button"
        >
          أضف
        </button>
      </div>
      <SelectedTags
        selectedOptions={selectedOptions}
        onRemoveTag={handleRemoveTag}
      />
    </div>
  );
}

export default TagSelectInput;
