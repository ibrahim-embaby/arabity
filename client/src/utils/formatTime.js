import moment from "moment";
import "moment/locale/ar";
import i18n from "../i18n";
export default function formatTime(time) {
  let locale = i18n.language;
  moment.locale(locale);
  return moment(time).format("dddd DD MMMM YYYY، h:mm A");
}
