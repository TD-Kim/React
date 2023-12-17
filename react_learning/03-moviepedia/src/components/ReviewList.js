import Rating from "./Rating";
import "./ReviewList.css";
import ReviewForm from "./ReviewForm.js";
import { useContext, useState } from "react";
import useTranslate from "../hooks/useTranslate.js";
import "./ReviewList.css";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function ReviewListItem({ item, onDelete, onEdit }) {
  // const locale = useContext(LocaleContext);
  // const locale = useLocale();
  const t = useTranslate();
  // const handleDeleteClick = () => onDelete(item.id);
  const handleDeleteClick = () => onDelete(item.docId);

  const handleEditClick = () => {
    onEdit(item.id);
  };

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
      <div className="ReviewListItem-rows">
        <h1 className="ReviewListItem-title">{item.title}</h1>
        <Rating className="ReviewListItem-rating" value={item.rating} />
        <p className="ReviewListItem-date">{formatDate(item.createdAt)}</p>
        <p className="ReviewListItem-content">{item.content}</p>
        <div className="ReviewListItem-buttons">
          <button
            className="ReviewListItem-edit-button"
            onClick={handleDeleteClick}
          >
            {t("edit button")}
          </button>
          <button
            className="ReviewListItem-delete-button"
            onClick={handleEditClick}
          >
            {t("delete button")}
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => setEditingId(null);

  return (
    <ul className="ReviewList">
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
