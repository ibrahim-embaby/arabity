import { Link } from "react-router-dom";
// import Rating from "../../components/rating/Rating";

import { useEffect, useState } from "react";
import RatingMui from "../../components/rating/RatingMui";
import limitText from "../../utils/limitText";

function SearchItem({ item }) {
  const [avgRating, setAvgRating] = useState(0);
  useEffect(() => {
    if (item.workshopRatings.length) {
      let sum = 0;
      for (let i = 0; i < item?.workshopRatings.length; i++) {
        sum += item?.workshopRatings[i].rating;
      }
      setAvgRating(sum / item?.workshopRatings.length);
    }
  }, [item.workshopRatings.length]);
  return (
    <Link to={`/workshop-owner/profile/${item._id}`} className="search-item">
      <div className="image-wrapper">
        <img
          className="workshop-image"
          src="/images/workshop-owner-avatar.png"
          alt=""
        />
      </div>
      <div className="info-wrapper">
        <div className="workshop-name">
          <span>{limitText(item.workshopName, 10)}</span>
          <RatingMui rating={avgRating} />
        </div>

        <p>
          <i className="bi bi-person-fill search-item-title"></i>
          {limitText(item.username, 10)}
        </p>
        <p>
          <i className="bi bi-car-front-fill search-item-title"></i>
          {item.cars.map((car) => (
            <span key={car}>{car} - </span>
          ))}
        </p>
        <p>
          <i className="bi bi-geo-alt-fill search-item-title"></i>
          {item.workshopBranches.map((branch) => (
            <span key={branch.workshopProvince}>
              {branch.branchProvince} -{" "}
            </span>
          ))}
        </p>
      </div>
    </Link>
  );
}

export default SearchItem;
