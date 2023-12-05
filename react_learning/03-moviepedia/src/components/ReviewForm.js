import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";

function ReviewForm() {
  //   const [title, setTitle] = useState("");
  //   const [rating, setRating] = useState(0);
  //   const [content, setContent] = useState("");
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
    imgFile: null,
  });

  //   const handleTitleChange = (e) => {
  //     setTitle(e.target.value);
  //   };
  //   const handleRatingChange = (e) => {
  //     const nextRating = Number(e.target.value);
  //     setRating(nextRating);
  //   };
  //   const handleContentChange = (e) => {
  //     setContent(e.target.value);
  //   };

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setValues((prevValues) => ({
  //       ...prevValues,
  //       [name]: value,
  //     }));
  //   };

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      />
      {/*
          HTML form 태그의 기본 동작은 submit 버튼을 눌렀을 때 입력 폼의 값과 함께 GET 리퀘스트를 보내는 것이다.
          그래서 기본 동작을 막아 줘야 한다.

          자바스크립트에서는 oninput 과 onchange 가 다르다.
          oninput 은 입력할 때마다 발생하는 이벤트이고 onchange는 사용자의 입력이 끝났을 때 발생한다.
          그런데 리액트에서는 onChange 이벤트가 사용자가 값을 입력할 때마다 발생한다.
          리액트 만든 개발자들이 onChange가 더 직관적이라고 이렇게 만듬.
        */}
      {/* <input value={title} onChange={handleTitleChange} />
      <input type="number" value={rating} onChange={handleRatingChange} />
      <textarea value={content} onChange={handleContentChange} /> */}
      <input name="title" value={values.title} onChange={handleInputChange} />
      <input
        type="number"
        name="rating"
        value={values.rating}
        onChange={handleInputChange}
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      />
      <button type="submit">확인</button>
    </form>
  );
}

export default ReviewForm;
