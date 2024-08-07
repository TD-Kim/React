import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// 비동기 작업 생성: 제품 데이터 가져오기
export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Error loading product');
    }
  }
);

// 초기 상태 정의
const initialState = {
  product: {},
  isLoading: false,
  error: '',
};

// `product` 슬라이스 생성
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error loading product';
      });
  },
});

export default productSlice.reducer;
