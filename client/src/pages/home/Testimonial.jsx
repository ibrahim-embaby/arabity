import React from "react";

function Testimonial({ img, text, visible, index }) {
  return (
    <div
      className="testimonial-item"
      style={{ display: visible === index && "unset" }}
    >
      <div className="testimonial-item-wrapper">
        <div className="testimonial-img-wrapper">
          <img className="testimonial-img" src={img} alt="" />
        </div>
        <div className="testimonial-text">{text}</div>
      </div>
    </div>
  );
}

export default Testimonial;
