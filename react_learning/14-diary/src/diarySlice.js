import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDatas, deleteDatas, getDatas, updateDatas } from './api/firebase';

const diarySlice = createSlice({
  name: 'diary',
  initialState: {
    items: [],
    error: null,
    status: 'Welcome',
  },
  reducers: {
    // reducers 를 사용하면 toolkit이 actionCreator 를 자동으로 만들어준다.
    test: (state, action) => {
      console.log('test reducer');
    },
  },
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
        state.items = action.payload;
        state.status = 'complete';
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'fail';
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = 'complete';
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.status = 'complete';
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.docId !== action.payload
        );
      });
  },
});

const fetchItems = createAsyncThunk(
  // fetchItems 는 actionCreator 이기 때문에 type 이 필요함
  'items/fetchAllItems',
  async (collectionName) => {
    try {
      const { resultData, lastQuery } = await getDatas(collectionName);
      return resultData; // 여기서 store의 state를 바꾼다. 누가? reducer가
    } catch (error) {
      console.log('FETCH Error: ', error);
    }
  }
);

const addItem = createAsyncThunk(
  'items/addItem',
  //   async (collectionName, addObj) => {
  async ({ collectionName, addObj }) => {
    try {
      const resultData = await addDatas(collectionName, addObj);
      return resultData;
    } catch (error) {
      console.log('ADD Error: ', error);
    }
  }
);

const updateItem = createAsyncThunk(
  'items/updateItem',
  async ({ collectionName, docId, updateObj }) => {
    console.log(collectionName, docId, updateObj);
    try {
      const resultData = await updateDatas(collectionName, docId, updateObj);
      return resultData;
    } catch (error) {
      console.log('UPDATE Error: ', error);
    }
  }
);

const deleteItem = createAsyncThunk(
  'items/removeItem',
  async ({ collectionName, docId }) => {
    try {
      const resultData = await deleteDatas(collectionName, docId);
      return resultData;
    } catch (error) {
      console.log('DELETE Error: ', error);
    }
  }
);

export default diarySlice;
export { fetchItems, addItem, updateItem, deleteItem };
