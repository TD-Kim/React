import React from "react";
import "./EmotionItem.css";

const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  isSelected,
  name,
  onChange
}) => {
  const handleClick = () => {
    onChange(name, emotion_id);
  }
  return (
    <div
      onClick={handleClick}
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`,
      ].join(" ")}
    >
      <img src={emotion_img} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default React.memo(EmotionItem);
