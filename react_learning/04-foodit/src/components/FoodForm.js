import { useState } from "react";
import "./FoodForm.css";
import FileInput from "./FileInput";
import { addDatas } from "../firebase";

const INITIAL_VALUES = {
  title: "",
  calorie: 0,
  content: "",
  imgUrl: null,
};

function FoodForm({ onSubmitSuccess }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title: values.title,
      calorie: values.calorie,
      content: values.content,
      imgUrl: values.imgFile,
    };

    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      const { review } = await addDatas("food", formData);
      onSubmitSuccess(review);
    } catch (error) {
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }
    setValues(INITIAL_VALUES);
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
  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, sanitize(type, value));
  };

  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      />
      <input name="title" value={values.title} onChange={handleInputChange} />
      <input
        type="number"
        name="calorie"
        value={values.calorie}
        onChange={handleInputChange}
      />
      <input
        name="content"
        value={values.content}
        onChange={handleInputChange}
      />
      <button type="submit">확인</button>
    </form>
  );
}

export default FoodForm;
