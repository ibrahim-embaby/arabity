import { Fragment } from "react";
import "./switch-bar.css";

function SwitchBar({ options, setVisibleForm, visibleForm, icons }) {
  return (
    <div className="switch-bar">
      {options?.map((option, index) => (
        <Fragment key={option}>
          <div
            className="option"
            onClick={() => setVisibleForm(index + 1)}
            style={{
              backgroundColor: visibleForm === index + 1 && "#333",
              color: visibleForm === index + 1 && "white",
            }}
          >
            {icons?.[index] && icons[index]}
            {option}
          </div>
          {index < options?.length - 1 && <span className="divider"></span>}
        </Fragment>
      ))}
    </div>
  );
}

export default SwitchBar;
