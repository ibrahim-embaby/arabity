import React from "react";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { rateWorkshopOwner } from "../../redux/apiCalls/ratingApiCall";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function AddRating({ id }) {
  const [rate, setRate] = useState(0);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const rateFormHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("من فضلك اكتب سبب تقييمك");
    if (rate === 0) return toast.error("من فضلك اختر تقييما");

    dispatch(rateWorkshopOwner(rate, id, text));
    setRate(0);
    setText("");
  };
  return (
    <form className="add-rating-form" onSubmit={rateFormHandler}>
      <label htmlFor="addRating">أضف تقييم</label>
      <Rating
        name="simple-controlled"
        value={rate}
        onChange={(event, newValue) => {
          setRate(newValue);
        }}
        className="add-rating-stars"
      />
      <input
        type="text"
        id="addRating"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="add-rating-text"
      />
      <button type="submit" className="add-rating-button">
        تقييم
      </button>
    </form>
  );
}

export default AddRating;
