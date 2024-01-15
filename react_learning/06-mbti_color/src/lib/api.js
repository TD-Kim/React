import mockItems from "../mock.json";

const mock = mockItems;
const LIMITS = 10;

export function getMockItems(lastItemNum) {
  console.log(lastItemNum, mock.length);
  if (lastItemNum === mock.length) return;

  lastItemNum = lastItemNum ? lastItemNum : 0;

  let nextItemNum = lastItemNum + LIMITS;

  const prevIdx = lastItemNum - 1;
  return { data: mock.slice(lastItemNum, nextItemNum), nextItemNum };
}

export function getMockItemsByFilter(filter) {
  console.log(filter);
  return { data: mock.filter(({ mbti }) => mbti == filter) };
}
