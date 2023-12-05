import { useState } from "react";
import "./FoodForm.css";

function FoodForm() {
  const [values, setValues] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  function sanitize(type, value) {
    switch (type) {
      case "number":
        return Number(value) || 0;

      default:
        return value;
    }
  }

  // 화살표 함수에서 리턴값을 그대로 써 줄 때 리턴값이 객체형이면 함수랑 구분이 안된다.
  // 그래서 오류가 나기 때문에 이런식으로 괄호를 감싸주면 이 값이 함수 실행 부분이 아니라
  // 리턴 값이고, 객체형인 리턴값이구나 하는 걸 표시해 줄 수 있다.
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: sanitize(type, value),
    }));
  };

  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <input name="title" value={values.title} onChange={handleChange} />
      <input
        type="number"
        name="calorie"
        value={values.calorie}
        onChange={handleChange}
      />
      <input name="content" value={values.content} onChange={handleChange} />
    </form>
  );
}

export default FoodForm;
