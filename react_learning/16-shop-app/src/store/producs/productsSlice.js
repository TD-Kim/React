import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// 비동기 작업 생성: 제품 목록 가져오기
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (category, thunkAPI) => {
    try {
      let response;
      if (category) {
        response = await axios.get(
          `https://fakestoreapi.com/products/category/${category}`
        );
      } else {
        response = await axios.get('https://fakestoreapi.com/products');
      }

      return response.data; // payload
    } catch (error) {
      return thunkAPI.rejectWithValue('Error loading products');
    }
  }
);

// 초기 상태 정의
const initialState = {
  products: [],
  isLoading: false,
  error: '',
};

// `products` 슬라이스 생성
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error loading products';
      });
  },
});

export default productsSlice.reducer;
