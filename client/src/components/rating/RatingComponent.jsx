import { deleteRating } from "../../redux/apiCalls/ratingApiCall";
import { useDispatch, useSelector } from "react-redux";
import RatingMui from "./RatingMui";
import { useTranslation } from "react-i18next";
import limitText from "../../utils/limitText";
import DeleteIcon from "@mui/icons-material/Delete";
import formatTime from "../../utils/formatTime";
import PersonIcon from "@mui/icons-material/Person";

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
        <span className="rating-item-info-name-wrapper">
          <PersonIcon sx={{ color: "#333" }} />
          {limitText(userRate.user.username, 10)}
        </span>
        <RatingMui rating={userRate.rating} />
      </p>
      <p className="rating-item-text">{userRate.text}</p>
      <p className="rating-item-date-wrapper">
        <p className="rating-item-date">{formatTime(userRate.createdAt)}</p>
        {(user?.isAdmin || user?.id === userRate.user._id) && (
          <button
            onClick={() => deleteRatingHandler(userRate._id)}
            className="delete-rating-btn"
          >
            <span> {t("delete_btn")}</span>
            <DeleteIcon />
          </button>
        )}
      </p>
    </div>
  );
}

export default RatingComponent;
