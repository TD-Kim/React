import Rating from "./Rating";
import "./ReviewList.css";
import ReviewForm from "./ReviewForm.js";
import { useContext, useState } from "react";
import LocaleContext, { useLocale } from "../contexts/LocaleContext.js";
function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function ReviewListItem({ item, onDelete, onEdit }) {
  // const locale = useContext(LocaleContext);
  const locale = useLocale();
  // const handleDeleteClick = () => onDelete(item.id);
  const handleDeleteClick = () => onDelete(item.docId);

  const handleEditClick = () => {
    onEdit(item.id);
  };

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <Rating value={item.rating} />
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
        <p>현재 언어 : {locale}</p>
        <button onClick={handleDeleteClick}>삭제</button>
        <button onClick={handleEditClick}>수정</button>
      </div>
    </div>
  );
}

function ReviewList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => setEditingId(null);

  return (
    <ul>
      {items.map((item) => {
        // return <li>{item.title}</li>;
        if (item.id === editingId) {
          const { docId, id, imgUrl, title, rating, content } = item;
          const initialValues = { title, rating, content, imgUrl: null };

          const handleSubmit = (collectionName, formData) =>
            onUpdate(collectionName, formData, docId, imgUrl);

          const handleSubmitSuccess = (review) => {
            onUpdateSuccess(review);
            setEditingId(null);
          };

          return (
            <li key={item.id}>
              <ReviewForm
                initialValues={initialValues}
                initialPreview={imgUrl}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
              />
            </li>
          );
        }
        return (
          <li key={item.id}>
            <ReviewListItem
              item={item}
              onDelete={onDelete}
              onEdit={setEditingId}
            />
            {/* <input></input> */}
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewList;
