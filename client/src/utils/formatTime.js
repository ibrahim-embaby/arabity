import moment from "moment";
import "moment/locale/ar";
// import { useTranslation } from "react-i18next";
// const { i18n } = useTranslation();
export default function formatTime(time) {
  let locale = "ar_SA";
  moment.locale(locale);
  return moment(time).format("dddd DD MMMM YYYY، h:mm A");
}
