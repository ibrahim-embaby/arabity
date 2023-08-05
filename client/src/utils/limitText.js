export default function limitText(text, limit) {
  return text.length > 10 ? text.substr(0, limit).concat("...") : text;
}
