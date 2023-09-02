import React from "react";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { rateMechanic } from "../../redux/apiCalls/ratingApiCall";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const labels = {
  0.5: "0.5",
  1: "1",
  1.5: "1.5",
  2: "2",
  2.5: "2.5",
  3: "3",
  3.5: "3.5",
  4: "4",
  4.5: "4.5",
  5: "5",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

function AddRating({ id }) {
  const [rate, setRate] = useState(0);
  const [text, setText] = useState("");
  const [hover, setHover] = React.useState(-1);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const rateFormHandler = (e) => {
    e.preventDefault();
    if (!text.trim()) return toast.info("من فضلك اكتب سبب تقييمك");
    if (rate === 0) return toast.error("من فضلك اختر تقييما");

    dispatch(rateMechanic(rate, id, text));
    setRate(0);
    setText("");
  };
  return (
    <form className="add-rating-form" onSubmit={rateFormHandler}>
      <label htmlFor="addRating">{t("add_rating")} </label>
      <div className="add-rating-component-wrapper">
        <Rating
          name="hover-feedback"
          precision={0.5}
          value={rate}
          onChange={(event, newValue) => {
            setRate(newValue);
          }}
          getLabelText={getLabelText}
          sx={{
            direction: "ltr",
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        {rate !== null && <Box>{labels[hover !== -1 ? hover : rate]}</Box>}
      </div>
      <input
        type="text"
        id="addRating"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="add-rating-text"
      />
      <button type="submit" className="add-rating-btn">
        {t("rate")}
      </button>
    </form>
  );
}

export default AddRating;
