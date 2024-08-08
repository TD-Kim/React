import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// 비동기 작업 생성: 제품 데이터 가져오기
export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (id, thunkAPI) => {
    // dispatch: 다른 액션을 디스패치할 수 있게 해준다.
    // getState: 현재 상태를 가져올 수 있게 해준다.
    // extra: 미들웨어가 생성될 때 추가적으로 주입한 데이터를 포함한다.
    // requestId: 이 비동기 요청의 고유 ID를 제공한ㄷ.
    // signal: 비동기 요청을 취소하기 위한 AbortController의 signal을 포함한다.
    // rejectWithValue: 사용자 정의 에러 메시지를 포함하여 리젝션을 처리할 수 있게 해준다.
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      return response.data;
    } catch (error) {
      // 여기서 return 하는 값이 reducer 의 rejected 로 들어간다.
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
