export async function getFoods(order = "createdAt") {
  const query = `order=${order}`;
  const response = await fetch(`https://learn.codeit.kr/4685/foods?${query}`);
  const body = await response.json();
  return body;
}
