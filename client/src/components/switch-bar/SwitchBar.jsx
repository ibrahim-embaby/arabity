import "./switch-bar.css";

function SwitchBar({ option1, option2, setVisibleForm, visibleForm }) {
  return (
    <div className="switch-bar">
      <div
        className="option1"
        onClick={() => setVisibleForm(1)}
        style={{
          backgroundColor: visibleForm === 1 && "rgba(254, 94, 80, 0.2)",
        }}
      >
        {option1}
      </div>
      <span className="divider"></span>
      <div
        className="option2"
        onClick={() => setVisibleForm(2)}
        style={{
          backgroundColor: visibleForm === 2 && "rgba(254, 94, 80, 0.2)",
        }}
      >
        {option2}
      </div>
    </div>
  );
}

export default SwitchBar;
