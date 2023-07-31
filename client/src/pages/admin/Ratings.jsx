import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RatingComponent from "../../components/rating/RatingComponent";
import { fetchAllRatings } from "../../redux/apiCalls/ratingApiCall";

function Ratings() {
  const dispatch = useDispatch();
  const { ratings } = useSelector((state) => state.rating);

  useEffect(() => {
    dispatch(fetchAllRatings());
  }, []);
  return (
    <div className="admin-ratings">
      {ratings.length ? (
        ratings.map((rating) => (
          <div className="rating-wrapper">
            <RatingComponent userRate={rating} />
          </div>
        ))
      ) : (
        <p>لا توجد تقييمات</p>
      )}
    </div>
  );
}

export default Ratings;
