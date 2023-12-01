import ReviewList from "./ReviewList";
// import items from "../mock.json";
import mockItems from "../mock.json";
import { useState } from "react";

function App() {
  const [items, setItems] = useState(mockItems);
  const [order, setOrder] = useState("createdAt");
  // sort 메소드에 아무런 아규먼트도 전달하지 않을 때는 기본적으로 유니코드에 정의된 문자열 순서에 따라 정렬된다.
  // ==> compareFunction이 생략될 경우 , 배열의 요소들은 모두 문자열 취급되며, 유니코드 값 순서대로 정렬된다.
  // 그렇기 때문에 numbers에 sort 메소드를 사용한 것 처럼, 숫자를 정렬할 때는 우리가 상식적으로 이해하는 오름차순이나 내림차순 정렬이 되지 않는다.
  // 그럴 땐 sort 메소드에 다음과 같은 콜백함수를 아규먼트로 작성해주면 된다.
  // 반환 값 < 0 : a가 b보다 앞에 있어야 한다.
  // 반환 값 = 0 : a와 b의 순서를 바꾸지 않는다.
  // 반환 값 > 0 : b가 a보다 앞에 있어야 한다.
  // a-b : 오름차순, b-a : 내림차순
  // const sortedItems = items.sort((a, b) => b.rating - a.rating);
  const sortedItems = items.sort((a, b) => b[order] - a[order]);
  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");
  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };
  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      {/* <ReviewList items={items} /> */}
      <ReviewList items={sortedItems} onDelete={handleDelete} />
    </div>
  );
}

export default App;
