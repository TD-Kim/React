import { configureStore } from '@reduxjs/toolkit';
import diarySlice from './diarySlice';

const store = configureStore({
  reducer: {
    // reducer 는 필수이고, 각각의 slice 들의 reducer 가 들어가면 된다.
    diary: diarySlice.reducer,
  },
});

export default store;
