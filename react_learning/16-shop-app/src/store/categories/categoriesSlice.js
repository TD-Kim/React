import { createSlice } from '@reduxjs/toolkit';
import { CategoriesName } from './categories';

const initialState = CategoriesName.All;

export const categoriesSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      return action.payload; // 새로운 상태를 반환합니다
    },
  },
});

export const { setActiveCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
