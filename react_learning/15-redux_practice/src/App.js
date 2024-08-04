import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice, createStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    // store 는 reducer 가 필요하다. 복수형인거 확인
    // type 별로 함수를 지정해준다. action의 type 에 따라서.. 이제 조건문 쓸 필요 없음.
    up: (state, action) => {
      console.log(action); // payload 라고 하는 약속된 이름의 값으로 들어온다. actions 를 사용하면!!
      // 이전에는 불변성 때문에 복제를 했다. 근데 이제 안해도됨.
      state.value = state.value + action.payload;
    },
  },
});
const store = configureStore({
  reducer: counterSlice.reducer,
});
/*
function reducer(state, action) {
  if (action.type === 'up') {
    return { ...state, value: state.value + action.step };
  }
  return state;
}

const initialState = { value: 0 };
const store = createStore(reducer, initialState);
*/

function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => {
    // state 에 들어있는 key 는 store의 reducer 에 넣어준 key 가 된다.
    console.log(state);
    return state.value;
  });
  return (
    <div>
      <button
        onClick={() => {
          // dispatch({ type: 'up', step: 2 });
          // counter/up 의 counter 는 slice 의 name, up은 reducer 명
          // dispatch({ type: 'counter/up', step: 2 });
          // 근데 이게 좀 귀찮음. ==> toolkit 에서는 자동으로 actionCreator 를 생성해준다.
          dispatch(counterSlice.actions.up(2));
        }}
      >
        +
      </button>{' '}
      {count}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <div>
        <Counter></Counter>
      </div>
    </Provider>
  );
}

export default App;
