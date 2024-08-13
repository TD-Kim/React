import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getDatas } from '../../firebase';

// 비동기 작업 생성: 제품 목록 가져오기
// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async (category, thunkAPI) => {
//     // dispatch: 다른 액션을 디스패치할 수 있게 해준다.
//     // getState: 현재 상태를 가져올 수 있게 해준다.
//     // extra: 미들웨어가 생성될 때 추가적으로 주입한 데이터를 포함한다.
//     // requestId: 이 비동기 요청의 고유 ID를 제공한ㄷ.
//     // signal: 비동기 요청을 취소하기 위한 AbortController의 signal을 포함한다.
//     // rejectWithValue: 사용자 정의 에러 메시지를 포함하여 리젝션을 처리할 수 있게 해준다.
//     try {
//       let response;
//       if (category) {
//         response = await axios.get(
//           `https://fakestoreapi.com/products/category/${category}`
//         );
//       } else {
//         response = await axios.get('https://fakestoreapi.com/products');
//       }

//       return response.data; // payload
//     } catch (error) {
//       return thunkAPI.rejectWithValue('Error loading products');
//     }
//   }
// );

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      return null;
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
