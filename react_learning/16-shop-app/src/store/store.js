import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import cartSlice from './cart/cartSlice';
import productSlice from './producs/productSlice';
import productsSlice from './producs/productsSlice';
import categoriesSlice from './categories/categoriesSlice';
import orderSlice from './order/orderSlice';

export const store = configureStore({
  reducer: {
    orderSlice,
    productSlice,
    cartSlice,
    userSlice,
    categoriesSlice,
    productsSlice,
  },
});
