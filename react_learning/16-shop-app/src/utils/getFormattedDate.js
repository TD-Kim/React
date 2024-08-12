export function getISODate(date) {
  const dateSplitArr = new Date(date).toISOString().split('T');
  const yyyyMMdd = dateSplitArr[0];
  const HHmmss = dateSplitArr[1].split('.')[0];
  const dateObj = {
    yyyyMMdd,
    HHmmss,
  };
  return dateObj;
}
