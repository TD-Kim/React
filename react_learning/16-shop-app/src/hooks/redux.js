import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../store';

// useDispatch 훅을 AppDispatch 타입으로 래핑
export const useAppDispatch = () => useDispatch();

// useSelector 훅을 RootState 타입으로 래핑
export const useAppSelector = (selector) => useSelector(selector);
