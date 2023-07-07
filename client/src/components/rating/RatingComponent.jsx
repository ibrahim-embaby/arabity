import Moment from "react-moment";
import RatingC from "./Rating";
import moment from "moment/";
moment.locale("ar_SA");
function RatingComponent({ userRate }) {
  return (
    <div className="rating-item">
      <p className="rating-item-info">
        <span>
          <i className="bi bi-person-fill search-item-title"></i>
          {userRate.username}
        </span>
        <RatingC rating={userRate.rating} />
      </p>
      <p className="rating-item-text">{userRate.text}</p>
      <p>
        <Moment format="LLLL">{userRate.createdAt}</Moment>
      </p>
    </div>
  );
}

export default RatingComponent;
