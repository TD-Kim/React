import { createSlice } from '@reduxjs/toolkit';

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

export default counterSlice;
export const { up } = counterSlice.actions;
