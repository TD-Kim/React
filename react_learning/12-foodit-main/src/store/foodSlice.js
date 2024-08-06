import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatasByOrderLimit } from '../firebase';
import createTransform from 'redux-persist/es/createTransform';
import storage from 'redux-persist/lib/storage';

const foodSlice = createSlice({
  name: 'food',
  initialState: {
    items: [],
    order: 'createdAt',
    lq: undefined,
    loading: 'welcome',
    hasNext: true,
    search: '',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // 비동기작업은 actionCreator 를 자동으로 만들어주지 못한다. 그런애들은 여기에.
    // pending, fulfilled, rejected는
    // createAsyncThunk 를 사용하면 자동으로 만들어 지는 상수라고 생각
    builder
      .addCase(fetchItems.pending, (state, action) => {
        // addCase 의 두번째 파라미터가 reducer
        state.status = 'Loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload.resultData;
        state.lq = action.payload.lastQuery;
        state.status = 'complete';
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'fail';
      });
    //   .addCase(addItem.fulfilled, (state, action) => {
    //     state.items.push(action.payload);
    //     state.status = 'complete';
    //   })
    //   .addCase(updateItem.fulfilled, (state, action) => {
    //     const index = state.items.findIndex(
    //       (item) => item.id === action.payload.id
    //     );
    //     if (index !== -1) {
    //       state.items[index] = action.payload;
    //     }
    //     state.status = 'complete';
    //   })
    //   .addCase(deleteItem.fulfilled, (state, action) => {
    //     state.items = state.items.filter(
    //       (item) => item.docId !== action.payload
    //     );
    //   });
  },
});

const dataTransform = createTransform(
  // 저장 시
  (inboundState) => ({
    ...inboundState,
    lq: inboundState.lq ? JSON.stringify(inboundState.lq) : null,
  }),
  // 복원 시
  (outboundState) => ({
    ...outboundState,
    lq: outboundState.lq ? JSON.parse(outboundState.lq) : null,
  }),
  // 직렬화 및 역직렬화 할 state의 키를 지정
  { whitelist: ['lq'] }
);

const fetchItems = createAsyncThunk(
  'items/fetchAllItems',
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatasByOrderLimit(
        collectionName,
        queryOptions
      );
      console.log(resultData);
      return resultData;
    } catch (error) {
      console.log('FETCH Error: ', error);
    }
  }
);

// const addItem = createAsyncThunk(
//   'items/addItem',
//   async ({ collectionName, addObj }) => {
//     try {
//       const resultData = await addDatas(collectionName, addObj);
//       return resultData;
//     } catch (error) {
//       console.log('ADD Error: ', error);
//     }
//   }
// );

// const updateItem = createAsyncThunk(
//   'items/updateItem',
//   async ({ collectionName, docId, updateObj }) => {
//     console.log(collectionName, docId, updateObj);
//     try {
//       const resultData = await updateDatas(collectionName, docId, updateObj);
//       return resultData;
//     } catch (error) {
//       console.log('UPDATE Error: ', error);
//     }
//   }
// );

// const deleteItem = createAsyncThunk(
//   'items/removeItem',
//   async ({ collectionName, docId }) => {
//     try {
//       const resultData = await deleteDatas(collectionName, docId);
//       return resultData;
//     } catch (error) {
//       console.log('DELETE Error: ', error);
//     }
//   }
// );

export default foodSlice;
export { dataTransform, fetchItems };
