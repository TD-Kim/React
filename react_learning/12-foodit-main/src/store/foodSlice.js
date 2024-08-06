import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDatas, getDatasByOrderLimit, updateDatas } from '../firebase';

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
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
      state.items = [];
    },
    setHasNext: (state, action) => {
      state.hasNext = action.payload;
    },
    setInitialItems: (state, action) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    // 비동기작업은 actionCreator 를 자동으로 만들어주지 못한다. 그런애들은 여기에.
    // pending, fulfilled, rejected는
    // createAsyncThunk 를 사용하면 자동으로 만들어 지는 상수라고 생각
    builder
      .addCase(fetchItems.pending, (state, action) => {
        // addCase 의 두번째 파라미터가 reducer
        state.loading = 'Loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload.resultData];
        state.lq = action.payload.lastQuery;
        // if (!action.payload.lastQuery) {
        //   state.hasNext = false;
        // } else {
        //   state.hasNext = true;
        // }
        // state.hasNext = action.payload.lastQuery ? true : false;
        state.hasNext = !!action.payload.lastQuery;
        state.loading = 'complete';
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = 'fail';
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
        state.loading = 'complete';
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

const fetchItems = createAsyncThunk(
  'items/fetchAllItems',
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatasByOrderLimit(
        collectionName,
        queryOptions
      );
      return resultData;
    } catch (error) {
      console.log('FETCH Error: ', error);
    }
  }
);

const addItem = createAsyncThunk(
  'items/addItem',
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
  async ({ collectionName, docId, updateObj, imgUrl }) => {
    console.log(collectionName, docId, updateObj);
    try {
      const resultData = await updateDatas(
        collectionName,
        docId,
        updateObj,
        imgUrl
      );
      return resultData;
    } catch (error) {
      console.log('UPDATE Error: ', error);
    }
  }
);

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
export { fetchItems, updateItem };
export const { setOrder, setHasNext, setInitialItems } = foodSlice.actions;
