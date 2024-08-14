import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getDatas } from '../../firebase';

// 비즈니스 로직에 맞는 API 엔드포인트로 수정하세요
const API_ENDPOINT = 'https://<>.mockapi.io/orders';

// export const fetchOrder = createAsyncThunk(
//   'order/fetchOrder',
//   async (userId, thunkAPI) => {
//     try {
//       const response = await axios.get(`${API_ENDPOINT}?search=${userId}`);
//       return response.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue('Error receiving order');
//     }
//   }
// );
export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async ({ collectionPath, queryOptions }, thunkAPI) => {
    try {
      const resultData = await getDatas(collectionPath, queryOptions);
      return resultData;
    } catch (err) {
      return thunkAPI.rejectWithValue('Error receiving order');
    }
  }
);

const initialState = {
  order: [],
  isLoading: false,
  error: '',
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
