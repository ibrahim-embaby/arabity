import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import RatingMui from "../../components/rating/RatingMui";
import limitText from "../../utils/limitText";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { useTranslation } from "react-i18next";

function SearchItem({ item }) {
  const [avgRating, setAvgRating] = useState(0);
  const { i18n } = useTranslation();
  useEffect(() => {
    if (item.mechanicRatings.length) {
      let sum = 0;
      for (let i = 0; i < item?.mechanicRatings.length; i++) {
        sum += item?.mechanicRatings[i].rating;
      }
      setAvgRating(sum / item?.mechanicRatings.length);
    }
  }, [item.mechanicRatings.length]);
  return (
    <Link to={`/mechanic/profile/${item._id}`} className="search-item">
      <div className="image-wrapper">
        <img
          className="workshop-image"
          src={
            item.profilePhoto.url ||
            "https://st2.depositphotos.com/1007566/12186/v/600/depositphotos_121865140-stock-illustration-man-avatar-mechanic-isolated.jpg"
          }
          alt=""
        />
      </div>

      <div className="info-wrapper">
        <div className="workshop-name">
          <span>{limitText(item.workshopName, 10)}</span>
          <RatingMui rating={avgRating} />
        </div>
        <div className="info-items">
          <div className="info-item-wrapper">
            <MiscellaneousServicesIcon sx={{ color: "#aaa" }} />
            <div className="info-item-data">
              {item.workshopServices.map((service) => (
                <span className="info-item-data-text" key={service._id}>
                  {service.label[i18n.language]}
                </span>
              ))}
            </div>
          </div>
          <div className="info-item-wrapper">
            <CarRepairIcon sx={{ color: "#aaa" }} />
            <div className="info-item-data">
              {item.cars.map((car) => (
                <span className="info-item-data-text" key={car._id}>
                  {car.label[i18n.language]}
                </span>
              ))}
            </div>
          </div>
          <div className="info-item-wrapper">
            <LocationOnIcon sx={{ color: "#aaa" }} />
            <div className="info-item-data">
              {item.workshopBranches.map((branch) => (
                <span className="info-item-data-text" key={branch._id}>
                  {branch.province.label[i18n.language]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SearchItem;
