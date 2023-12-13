import { useState } from "react";
import "./Rating.css";

const RATINGS = [1, 2, 3, 4, 5];

// 리액트 Hook을 컴포넌트 함수 밖에서 사용하면 에러가 난다.
// 리액트 Hook은 반드시 리액트 컴포넌트 안에서만 실행되어야 한다.
// 리액트 Hook은 컴포넌트 함수에서 사용하도록 만들어진 것이기 때문이다.
// const [state, setState] = useState();

function Star({ selected = false, rating, onSelect, onHover }) {
  const className = `Rating-star ${selected ? "selected" : ""}`;

  const handleClick = onSelect ? () => onSelect(rating) : undefined;
  const handleMouseOver = onHover ? () => onHover(rating) : undefined;

  return (
    <span
      className={className}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >
      ★
    </span>
  );
}

function Rating({ className, value = 0, onSelect, onHover, onMouseOut }) {
  return (
    <div className={className} onMouseOut={onMouseOut}>
      {RATINGS.map((rating) => (
        <Star
          key={rating}
          selected={value >= rating}
          rating={rating}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
      {/* <Star selected={value >= 2} />
      <Star selected={value >= 3} />
      <Star selected={value >= 4} />
      <Star selected={value >= 5} /> */}
    </div>
  );
}

export default Rating;
