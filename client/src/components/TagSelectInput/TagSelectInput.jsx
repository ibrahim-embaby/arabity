import "./TagSelectInput.css";
import SelectedTags from "./SelectedTags";
import { useTranslation } from "react-i18next";

function TagSelectInput({
  selectedOptions,
  setSelectedOptions,
  selectOptions,
  setSelectOptions,
  placeholder,
}) {
  const { i18n } = useTranslation();
  const handleRemoveTag = (tagToRemove) => {
    setSelectedOptions(
      selectedOptions.filter((tag) => tag.value !== tagToRemove.value)
    );
    setSelectOptions([
      ...selectOptions,
      selectedOptions.find((tag) => tag.value === tagToRemove.value),
    ]);
  };

  const handleOptionsChange = (event) => {
    const newValue = event.target.value;
    const newOption = selectOptions.find((option) => option.value === newValue);
    setSelectOptions(
      selectOptions.filter((option) => option.value !== newValue)
    );
    setSelectedOptions([...selectedOptions, newOption]);
  };

  return (
    <div className="tag-select-input-container">
      <select onChange={handleOptionsChange} className="tag-select-input">
        <option value="">{placeholder}</option>
        {selectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label[i18n.language]}
          </option>
        ))}
      </select>
      <SelectedTags
        selectedOptions={selectedOptions}
        onRemoveTag={handleRemoveTag}
        lang={i18n.language}
      />
    </div>
  );
}

export default TagSelectInput;
