import "./tag-select-input.css";
import SelectedTags from "./SelectedTags";
import { useTranslation } from "react-i18next";

function TagSelectInput({
  selectedOptions,
  setSelectedOptions,
  selectOptions,
  placeholder,
}) {
  const { i18n } = useTranslation();
  const handleRemoveTag = (tagToRemove) => {
    setSelectedOptions(
      selectedOptions.filter((tag) => tag.value !== tagToRemove.value)
    );
  };

  const handleOptionsChange = (event) => {
    const newValue = event.target.value;
    const newOption = selectOptions.find((option) => option.value === newValue);

    setSelectedOptions([...selectedOptions, newOption]);
  };

  return (
    <div className="tag-select-input-container">
      <select
        value={""}
        onChange={handleOptionsChange}
        className="tag-select-input"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {selectOptions?.map(
          (option) =>
            !selectedOptions
              .map((selectedOption) => selectedOption.value)
              ?.includes(option.value) && (
              <option key={option.value} value={option.value}>
                {option.label[i18n.language]}
              </option>
            )
        )}
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
