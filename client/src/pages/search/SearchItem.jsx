import { Link } from "react-router-dom";
import Rating from "../../components/rating/Rating";
import { useEffect, useState } from "react";

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
        <p className="workshop-name">
          {item.workshopName} <Rating rating={avgRating} />
        </p>

        <p>
          <i className="bi bi-person-fill search-item-title"></i>
          {/* <span className="search-item-title">اسم المسؤول:</span> */}
          {item.username}
        </p>
        <p>
          <i className="bi bi-car-front-fill search-item-title"></i>
          {/* <span className="search-item-title">انواع السيارات: </span> */}
          {item.cars.map((car) => (
            <span key={car}>{car} - </span>
          ))}
        </p>
        <p>
          <i className="bi bi-geo-alt-fill search-item-title"></i>
          {/* <span className="search-item-title">العنوان: </span> */}
          {item.workshopBranches.map((branch) => (
            <span key={branch.workshopProvince}>
              {branch.branchProvince} -{" "}
            </span>
          ))}
        </p>
        {/* <p> */}
        {/* <i className="bi bi-telephone-fill search-item-title"></i> */}
        {/* <span className="search-item-title">موبايل: </span> */}
        {/* {item.mobile} */}
        {/* </p> */}
      </div>
    </Link>
  );
}

export default SearchItem;
