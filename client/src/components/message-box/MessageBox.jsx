import "./message-box.css";

function MessageBox({ text, time, view }) {
  return (
    <div className={`message-box ${view}`}>
      <p className="message-text">{text}</p>
      <p className="message-time">{time}</p>
    </div>
  );
}

export default MessageBox;
