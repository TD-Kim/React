import "./FoodList.css";

function FoodListItem({ item, onDelete }) {
  const handleDeleteClick = () => onDelete(item.id);
  const { imgUrl, title, calorie, content } = item;

  return (
    <div className="FoodListItem">
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
      <button onClick={handleDeleteClick}>삭제</button>
    </div>
  );
}

function FoodList({ items, onDelete }) {
  // 아래 화살표 함수에서 {} 가 아닌 () 로 감싸는 이유는
  // 일단 화살표 함수는 반환값이 한 줄로 표현 가능한 코드이면 {return}이 생략 가능하다.
  // 그런데 반환값이 객체(object)이면 소괄호를 씌워줘야한다.
  // console.log(typof(<li><FoodListItem item={item} /></li>)) 를 해보면 object가 반환된다.
  return (
    <ul className="FoodList">
      {items.map((item) => (
        <li key={item.id}>
          <FoodListItem item={item} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}

export default FoodList;
