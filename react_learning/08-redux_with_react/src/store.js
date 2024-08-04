import { legacy_createStore as createStore } from 'redux';
// createStore deprecated 되어서 legacy_createStore 로 적어줘야 함
import {
  configureStore,
  createAction,
  createReducer,
  createSlice,
} from '@reduxjs/toolkit';

// const ADD = 'ADD'; // redux-toolkit의 createAction('ADD') 로 대체된다.
// const DELETE = 'DELETE'; // redux-toolkit의 createAction('DELETE') 로 대체된다.

// const addToDo = (text) => {
//   return {
//     type: ADD,
//     text,
//   };
// };

// const deleteToDo = (id) => {
//   return {
//     type: DELETE,
//     id: parseInt(id),
//   };
// };

const addToDo = createAction('ADD');
const deleteToDo = createAction('DELETE');

// const reducer = (state = [], action) => {
//   switch (action.type) {
//     // case ADD:
//     //   return [{ text: action.text, id: Date.now() }, ...state];
//     // case DELETE:
//     //   return state.filter((toDo) => toDo.id !== action.id);
//     // default:
//     //   return state;
//     case addToDo.type: // addToDo.type 이 'ADD' 를 줌
//       console.log(action);
//       return [{ text: action.payload, id: Date.now() }, ...state];
//     case deleteToDo.type:
//       return state.filter((toDo) => toDo.id !== action.payload);
//     default:
//       return state;
//   }
// };

// const reducer = createReducer([], (builder) => {
//   // createReducer 의 첫번째 파라미터 : initialState
//   // switch 가 없어진다. 그리고 state 를 mutate 할 수 있게 해준다.
//   builder
//     .addCase(addToDo, (state, action) => {
//       // 이전 reducer 방식은 state를 mutate하지 못했다. 새로운 state 를 만들어야 했음. 이제 복제하는게 가능함
//       // 리덕스툴킷에서 mutate 하는 이유는 리덕스툴킷이 immer 아래에서 작동되기 때문.
//       // 이전 reducer 처럼 return 을 쓰지 않고 아래처럼 작성해도 immer 가 return 써서 작성한것 처럼 만들어서 줌
//       state.push({ text: action.payload, id: Date.now() });
//     })
//     .addCase(deleteToDo, (state, action) => {
//       console.log(state, action);
//       state.filter((toDo) => toDo.id !== action.payload);
//     });
// });

const toDos = createSlice({
  name: 'toDosReducer',
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) =>
      state.filter((toDo) => toDo.id !== action.payload),
  },
});

// const store = createStore(reducer);
// store.subscribe();
// 변경사항을 우리에게 알려줌.
// 변화가 일어나면 우리의 어플리케이션을 리렌더링 하고 싶으니.
// 이때 필요한게 react-redux 이다.

// console.log(addToDo, deleteToDo);
// console.log(addToDo(), deleteToDo());

const store = configureStore({ reducer: toDos.reducer });
console.log(toDos.actions);

// export const actionCreators = {
//   addToDo,
//   deleteToDo,
// };
export const { add, remove } = toDos.actions;

export default store;
