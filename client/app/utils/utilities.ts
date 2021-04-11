export const getTime = (date: string) => {
  const newDate = new Date(date);
  let hour = newDate.getHours();
  let min = newDate.getMinutes();
  let apm = hour >= 12 ? "pm" : "am";
  hour = hour % 12;
  hour = hour ? hour : 12;
  min = min < 10 ? 0 + min : min;
  const mytime = hour + ":" + min + " " + apm;
  return mytime;
};
