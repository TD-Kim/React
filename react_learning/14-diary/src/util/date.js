export const getStringDate = (date) => {
  console.log(date);
  return date.toISOString().slice(0, 10);
};
