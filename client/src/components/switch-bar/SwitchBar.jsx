import { Fragment } from "react";
import "./switch-bar.css";

function SwitchBar({ options, setVisibleOption, visibleOption, icons }) {
  return (
    <div className="switch-bar">
      {options?.map((option, index) => (
        <Fragment key={option?.title}>
          <div
            className="option"
            onClick={() => setVisibleOption(index + 1)}
            style={{
              backgroundColor: visibleOption === index + 1 && "#333",
              color: visibleOption === index + 1 && "white",
            }}
          >
            {icons?.[index] && icons[index]}
            {option?.title}
          </div>
          {index < options?.length - 1 && <span className="divider"></span>}
        </Fragment>
      ))}
    </div>
  );
}

export default SwitchBar;
