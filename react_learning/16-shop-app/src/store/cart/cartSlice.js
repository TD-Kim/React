import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { addCart, asyncCart, createOrder, deleteDatas } from '../../firebase';
import { addDatasRest, asyncCartRest } from '../../api';

// `postOrder` 비동기 작업 생성
// export const postOrder = createAsyncThunk(
//   'cart/postOrder',
//   async (order, thunkAPI) => {
//     try {
//       await axios.post(
//         'https://640f6d494ed25579dc4ec41b.mockapi.io/orders',
//         order
//       );

//       thunkAPI.dispatch(sendOrder());
//     } catch (error) {
//       return thunkAPI.rejectWithValue('Error sending order');
//     }
//   }
// );

export const postOrder = createAsyncThunk(
  'cart/createOrder',
  async ({ uid, cart }, thunkAPI) => {
    try {
      // const result = await createOrder(uid, cart);
      const addObj = {
        cancelYn: 'N',
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        ...cart,
      };
      await addDatasRest(
        `/users/${uid}/orders/${crypto.randomUUID().slice(0, 20)}`,
        addObj
      );
      // if (!result) {
      //   return;
      // }
      thunkAPI.dispatch(sendOrder());
    } catch (error) {
      return thunkAPI.rejectWithValue('Error sending order');
    }
  }
);

const initialState = {
  products: localStorage.getItem('cartProducts')
    ? JSON.parse(localStorage.getItem('cartProducts') || '[]')
    : [],
  totalPrice: 0,
  userId: localStorage.getItem('userId')
    ? JSON.parse(localStorage.getItem('userId') || '""')
    : '',
};

// `cart` 슬라이스 생성
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem('userId', JSON.stringify(state.userId));
    },
    removeUserId: (state) => {
      state.userId = '';
      localStorage.setItem('userId', JSON.stringify(state.userId));
    },
    addToCart: (state, action) => {
      console.log(action.payload);
      state.products.push({
        ...action.payload,
        quantity: 1,
        total: action.payload.price,
      });
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },
    deleteFromCart: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },
    asyncCartAndSlice: (state, action) => {
      state.products = action.payload;
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },
    incrementProduct: (state, action) => {
      state.products = state.products.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity + 1,
              total: item.price * (item.quantity + 1),
            }
          : item
      );
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },
    decrementProduct: (state, action) => {
      state.products = state.products.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity - 1,
              total: item.price * (item.quantity - 1),
            }
          : item
      );
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },
    getTotalPrice: (state) => {
      state.totalPrice = state.products.reduce(
        (acc, item) => (acc += item.total),
        0
      );
    },
    sendOrder: (state) => {
      state.products = [];
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },
  },
});

export const asyncCartAndStorage = createAsyncThunk(
  'cart/asyncCartItem',
  async ({ uid, cartItems }, thunkAPI) => {
    try {
      // const result = await asyncCart(uid, cartItems);
      const result = await asyncCartRest(uid, cartItems);
      thunkAPI.dispatch(asyncCartAndSlice(result));
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue('Async Cart and Storage Error');
    }
  }
);

export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async ({ collectionName, product }, thunkAPI) => {
    try {
      await thunkAPI.dispatch(addToCart(product));
      // const products = thunkAPI.getState().cartSlice.products;
      const {
        cartSlice: { products },
      } = thunkAPI.getState();
      const addItem = products.find(
        (sliceProduct) => sliceProduct.id === product.id
      );
      // await addCart(collectionName, addItem);
      await addDatasRest(collectionName, addItem);
    } catch (error) {}
  }
);

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async ({ collectionName, productId }, thunkAPI) => {
    try {
      const resultData = await deleteDatas(collectionName, productId);
      if (resultData) {
        thunkAPI.dispatch(deleteFromCart(productId));
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Error Delete CartItem');
    }
  }
);

export const {
  addToCart,
  sendOrder,
  deleteFromCart,
  asyncCartAndSlice,
  incrementProduct,
  decrementProduct,
  getTotalPrice,
  setUserId,
  removeUserId,
} = cartSlice.actions;

export default cartSlice.reducer;
