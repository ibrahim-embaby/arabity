import "./rating.css";
import Rating from "@mui/material/Rating";

function RatingMui({ rating }) {
  const defaultRating = 5;
  const roundedNumber = Math.round(rating * 10) / 10;
  const formattedNumber = roundedNumber.toFixed(1);

  return (
    <p className="workshop-name-rating-wrapper">
      <span>
        {formattedNumber}/{defaultRating}
      </span>
      <Rating
        name="half-rating-read"
        precision={0.1}
        value={rating}
        readOnly
        dir="ltr"
      />
    </p>
  );
}

export default RatingMui;
