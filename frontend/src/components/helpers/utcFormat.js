export default function utcFormat(utc) {
  if (utc) {
    const timeArray = utc.split(/[T.]/);
    return `${timeArray[0]} ${timeArray[1]}`;
  }
  return null;
}
