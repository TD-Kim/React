import React from 'react';
// import { CategoriesName } from '../../../../store/categories/categories.type'; // 여전히 필요한 경우
import styles from './CategoryTab.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../../../../store/categories/categoriesSlice';

// CategoryTab 컴포넌트
const CategoryTab = ({ text, categoryName }) => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.categoriesSlice);

  const getActiveCategory = () => {
    dispatch(setActiveCategory(categoryName));
  };

  return (
    <button
      className={
        categoryName === category
          ? styles.active_category
          : styles.category_button
      }
      onClick={getActiveCategory}
    >
      {text}
    </button>
  );
};

export default CategoryTab;
