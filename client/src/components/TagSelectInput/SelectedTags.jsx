function SelectedTags({ selectedOptions, onRemoveTag }) {
  return (
    <div className="selected-tags-container">
      {selectedOptions.map((option, index) => (
        <div key={index} className="selected-tag">
          {option.label}
          <button
            className="selected-tag-remove"
            onClick={() => onRemoveTag(option)}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}

export default SelectedTags;
