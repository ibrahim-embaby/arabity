function SelectedTags({ selectedOptions, onRemoveTag, lang }) {
  return (
    <div className="selected-tags-container">
      {selectedOptions.map((option, index) => (
        <div key={option._id} className="selected-tag">
          {option.label[lang]}
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
