export function getISODate(date) {
  const offset = new Date().getTimezoneOffset() * 60000; // 9시간 밀리세컨드 값
  const dateSplitArr = new Date(date - offset).toISOString().split('T');
  const yyyyMMdd = dateSplitArr[0];
  const HHmmss = dateSplitArr[1].split('.')[0];
  const dateObj = {
    yyyyMMdd,
    HHmmss,
  };
  return dateObj;
}
