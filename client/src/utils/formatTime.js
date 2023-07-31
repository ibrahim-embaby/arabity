import moment from "moment";
import "moment/locale/ar";

export default function formatTime(time) {
  let locale = "ar_SA";
  moment.locale(locale);
  return moment(time).format("dddd DD MMMM YYYY، h:mm A");
}
