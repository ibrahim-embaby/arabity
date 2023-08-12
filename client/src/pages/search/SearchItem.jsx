import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import RatingMui from "../../components/rating/RatingMui";
import limitText from "../../utils/limitText";
import PersonIcon from "@mui/icons-material/Person";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import LocationOnIcon from "@mui/icons-material/LocationOn";

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
          src="https://st2.depositphotos.com/1007566/12186/v/600/depositphotos_121865140-stock-illustration-man-avatar-mechanic-isolated.jpg"
          alt=""
        />
      </div>

      <div className="info-wrapper">
        <div className="workshop-name">
          <span>{limitText(item.workshopName, 10)}</span>
          <RatingMui rating={avgRating} />
        </div>

        <div className="info-item-wrapper">
          <PersonIcon sx={{ color: "#333" }} />
          {limitText(item.username, 10)}
        </div>
        <div className="info-item-wrapper">
          <CarRepairIcon sx={{ color: "#333" }} />
          <div className="info-item-data">
            {item.cars.map((car, index) => (
              <span key={index}>{car} - </span>
            ))}
          </div>
        </div>
        <div className="info-item-wrapper">
          <LocationOnIcon sx={{ color: "#333" }} />
          <div className="info-item-data">
            {item.workshopBranches.map((branch, index) => (
              <span key={index}>{branch.branchProvince} - </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SearchItem;
