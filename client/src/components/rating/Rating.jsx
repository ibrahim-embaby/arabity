import "./rating.css";

function Rating({ rating }) {
  rating = parseInt(rating);
  const defaultRating = 5;
  const ratingArray = [];
  for (let i = 1; i <= rating; i++) {
    ratingArray.push(i);
  }
  const emptyStars = [];
  for (let i = 1; i <= defaultRating - ratingArray.length; i++) {
    emptyStars.push(i);
  }
  return (
    <span className="rating">
      {rating && (
        <span>
          {rating} / {defaultRating}
        </span>
      )}
      <span>
        {emptyStars?.map((r) => (
          <i key={r} className="bi bi-star" style={{ color: "gold" }}></i>
        ))}
        {ratingArray?.map((r) => (
          <i key={r} className="bi bi-star-fill" style={{ color: "gold" }}></i>
        ))}
      </span>
    </span>
  );
}

export default Rating;
