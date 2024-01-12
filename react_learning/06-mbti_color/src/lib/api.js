import mockItems from "../mock.json";

const mock = mockItems;
const LIMITS = 10;

export function getMockItems(prevPage) {
  if (prevPage === undefined) {
    const res = mock.slice(0, LIMITS);
    console.log(mock);
    return mock.slice(0, LIMITS);
  }

  const prevIdx = prevPage - 1;
  console.log(mock);
  return mock.slice(prevPage, prevPage + LIMITS);
}
