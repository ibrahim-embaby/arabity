import Moment from "react-moment";
import moment from "moment/";
import { deleteRating } from "../../redux/apiCalls/ratingApiCall";
import { useDispatch, useSelector } from "react-redux";
import RatingMui from "./RatingMui";
import { useTranslation } from "react-i18next";
moment.locale("ar_SA");
function RatingComponent({ userRate }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const deleteRatingHandler = (id) => {
    dispatch(deleteRating(id));
  };
  return (
    <div className="rating-item">
      <p className="rating-item-info">
        <span>
          <i className="bi bi-person-fill search-item-title"></i>
          {userRate.username}
        </span>
        <RatingMui rating={userRate.rating} />
      </p>
      <p className="rating-item-text">{userRate.text}</p>
      <p className="rating-item-date-wrapper">
        <p className="rating-item-date">
          <Moment format="LLLL">{userRate.createdAt}</Moment>
        </p>
        {(user?.isAdmin || user?.id === userRate.user) && (
          <button
            onClick={() => deleteRatingHandler(userRate._id)}
            className="delete-rating-button"
          >
            {t("delete_btn")}
          </button>
        )}
      </p>
    </div>
  );
}

export default RatingComponent;
