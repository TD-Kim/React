import FoodList from "./FoodList";
// import mockItems from "../mock.json";
import { useState } from "react";

function App() {
  // const [items, setItems] = useState(mockItems);
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [cursor, setCursor] = useState();

  const handleNewestClick = () => setOrder("createdAt");

  const handleCalorieClick = () => setOrder("calorie");
  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    const {
      foods,
      paging: { nextCursor },
    } = await getFoods(options);
    if (!options.cursor) {
      setItems(foods);
    } else {
      setItems((prevItems) => [...prevItems, ...foods]);
    }
    setCursor(nextCursor);
  };

  const handleLoadMore = () => {
    handleLoad({
      order,
      cursor,
    });
  };

  useEffect(() => {
    handleLoad({ order });
  }, [order]);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);
  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <FoodList items={sortedItems} onDelete={handleDelete} />
      <button onClick={handleLoad}>불러오기</button>
      {cursor && <button onClick={handleLoadMore}>더보기</button>}
    </div>
  );
}

export default App;
