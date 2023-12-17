import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import useAsync from "../hooks/useAsync";
import useTranslate from "../hooks/useTranslate";
import "./ReviewForm.css";

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgUrl: null,
};

function ReviewForm({
  className = "",
  initialValues = INITIAL_VALUES,
  initialPreview,
  onSubmitSuccess,
  onCancel,
  onSubmit,
}) {
  //   const [title, setTitle] = useState("");
  //   const [rating, setRating] = useState(0);
  //   const [content, setContent] = useState("");
  // const [values, setValues] = useState({
  //   title: "",
  //   rating: 0,
  //   content: "",
  //   imgFile: null,
  // });
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);
  const t = useTranslate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData(); // 파이어베이스에 데이터를 추가할 때 formData 는 사용할 수 없다.
    const formData = {
      title: values.title,
      rating: values.rating,
      content: values.content,
      imgUrl: values.imgUrl,
    };

    // formData 는 XMLHttpRequest 전송을 위해 설꼐된 특수한 객체여서
    // 문자열화할 수 없는 객체이기 때문에 console 로 확인할 수 없다.
    // console.log(formData);
    // for (let key of formData.keys()) {
    //   console.log(key);
    // }
    let result = await onSubmitAsync("movie", formData);
    if (!result) return;
    const { review } = result;
    setValues(INITIAL_VALUES);
    onSubmitSuccess(review);
  };

  return (
    <form className={`ReviewForm ${className}`} onSubmit={handleSubmit}>
      <FileInput
        className="ReviewForm-preview"
        name="imgUrl"
        value={values.imgUrl}
        initialPreview={initialPreview}
        onChange={handleChange}
      />
      <div className="ReviewForm-rows">
        <div className="ReviewForm-title-rating">
          <input
            className="ReviewForm-title"
            name="title"
            value={values.title}
            onChange={handleInputChange}
          />
          <RatingInput
            className="ReviewForm-rating"
            type="number"
            name="rating"
            value={values.rating}
            onChange={handleChange}
          />
        </div>
        <textarea
          className="ReviewForm-content"
          name="content"
          value={values.content}
          placeholder={t("content placeholder")}
          onChange={handleInputChange}
        />
        <div className="ReviewForm-error-buttons">
          <div className="ReviewForm-error">
            {submittingError && <div>{submittingError.message}</div>}
          </div>
          <div className="ReviewForm-buttons">
            {onCancel && (
              <button className="ReviewForm-cancel-button" onClick={onCancel}>
                {t("cancel button")}
              </button>
            )}
            <button
              className="ReviewForm-submit-button"
              type="submit"
              disabled={isSubmitting}
            >
              {t("confirm button")}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
