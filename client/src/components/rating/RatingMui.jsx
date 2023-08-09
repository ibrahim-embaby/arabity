import "./rating.css";
import Rating from "@mui/material/Rating";

function RatingMui({ rating }) {
  const defaultRating = 5;

  return (
    <p className="workshop-name-rating-wrapper">
      <span>
        {rating} / {defaultRating}
      </span>
      <Rating
        name="half-rating-read"
        precision={0.5}
        value={rating}
        readOnly
        dir="ltr"
      />
    </p>
  );
}

export default RatingMui;
